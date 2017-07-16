'use strict';

var _ = require('lodash');
var Promise = require('bluebird');
var downloader = require('../downloader');

var config = require('config');
var DEFAULT_SEARCH_URL = 'https://next.openspending.org/search/package';
module.exports.searchApiUrl = config.searchUrl || DEFAULT_SEARCH_URL;

function getUniqueItems(items) {
  var result = {};
  if (_.isArray(items)) {
    _.each(items, function(item) {
      result[item] = true;
    });
  } else {
    if (items) {
      result[items] = true;
    }
  }
  return _.keys(result);
}

function getResourceFormatFromMediaType(value) {
  value = ('' + value).toLowerCase();
  switch (value) {
    case 'text/csv':
    case 'application/csv':
      return 'csv';
    case 'application/json':
    case 'application/x-json':
    case 'text/json':
    case 'text/x-json':
      return 'json';
    default:
      return '';
  }
}

function getResourceFormats(dataPackage) {
  if (!_.isObject(dataPackage) || !_.isArray(dataPackage.resources)) {
    return [];
  }

  var formats = {};
  _.forEach(dataPackage.resources, function(resource) {
    var format = '';
    if (_.isString(resource.format) && (resource.format != '')) {
      format = resource.format.toLowerCase();
    } else if (_.isString(resource.mediatype) && (resource.mediatype != '')) {
      format = getResourceFormatFromMediaType(resource.mediatype);
    }
    if (format != '') {
      formats[format] = true;
    }
  });
  return _.keys(formats);
}

function getDataPackages(query) {
  var url = module.exports.searchApiUrl + '?size=10000';

  if (query !== undefined) {
    url += '&q=' + encodeURIComponent(JSON.stringify(query));
  }

  return downloader.getJson(url)
    .then(function(packages) {
      return _.chain(packages)
        .filter(_.isObject)
        .map(function(item) {
          return {
            id: item.id,
            name: item.package.name,
            title: item.package.title || item.package.name,
            description: item.package.description,
            authors: [item.package.author],
            regions: getUniqueItems(item.package.regionCode),
            countries: getUniqueItems(item.package.countryCode),
            cities: getUniqueItems(item.package.cityCode),
            formats: getResourceFormats(item.package)
          };
        })
        .sortBy('title')
        .value();
    });
}

var getAllDataPackages = (function() {
  var allDataPackagesCache;

  return function getAllDataPackages() {
    if (allDataPackagesCache !== undefined) {
      return Promise.resolve(allDataPackagesCache);
    }

    return getDataPackages()
      .then(function(allDataPackages) {
        allDataPackagesCache = allDataPackages;

        return allDataPackages;
      });
  };
})();

function searchByTitle(query) {
  return getDataPackages(query);
}

function isFilterValueSet(value) {
  return _.isArray(value) && (value.length > 0);
}

function matchArray(item, compareTo) {
  if (!isFilterValueSet(compareTo)) {
    return true;
  }
  return _.intersection(item, compareTo).length > 0;
}

function performSearch(filters) {
  var promise;
  if (_.trim(filters.q) != '') {
    promise = searchByTitle(filters.q);
  } else {
    promise = getAllDataPackages();
  }

  return promise.then(function(dataPackages) {
    var result = {
      items: [],
      options: {
        authors: {},
        regions: {},
        countries: {},
        cities: {},
        formats: {}
      }
    };

    filters = filters.filter;
    var isFilterSet = {
      authors: isFilterValueSet(filters.authors),
      regions: isFilterValueSet(filters.regions),
      countries: isFilterValueSet(filters.countries),
      cities: isFilterValueSet(filters.cities),
      formats: isFilterValueSet(filters.formats)
    };

    _.each(dataPackages, function(dataPackage) {
      var matches = {
        authors: matchArray(dataPackage.authors, filters.authors),
        regions: matchArray(dataPackage.regions, filters.regions),
        countries: matchArray(dataPackage.countries, filters.countries),
        cities: matchArray(dataPackage.cities, filters.cities),
        formats: matchArray(dataPackage.formats, filters.formats)
      };
      var matchesAll = _.reduce(matches, function(result, item) {
        return result && item;
      }, true);
      if (matchesAll) {
        result.items.push(dataPackage);
      }

      _.each(result.options, function(optionValues, optionKey) {
        if (isFilterSet[optionKey]) {
          // Use value if it is already selected
          _.each(filters[optionKey], function(value) {
            optionValues[value] = true;
          });
          // Pick values from items that matches all filters except this one
          var matchesExcept = _.reduce(matches, function(result, item, key) {
            return key == optionKey ? result : result && item;
          }, true);
          if (matchesExcept) {
            _.each(dataPackage[optionKey], function(value) {
              optionValues[value] = true;
            });
          }
        } else {
          // If filter is not selected, pick values only from
          // items that matches other filters
          if (matchesAll) {
            _.each(dataPackage[optionKey], function(value) {
              optionValues[value] = true;
            });
          }
        }
      });
    });

    // Get unique values
    result.options = _.chain(result.options)
      .map(function(values, key) {
        values = _.keys(values);
        if ((values.length > 1) || isFilterSet[key]) {
          return [key, _.sortBy(values)];
        }
        return null;
      })
      .filter()
      .fromPairs()
      .value();

    return result;
  });
}

module.exports.getAllDataPackages = getAllDataPackages;
module.exports.performSearch = performSearch;
