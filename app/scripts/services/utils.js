'use strict';

var _ = require('lodash');

function getResourceFormats(dataPackage) {
  if (!_.isObject(dataPackage) || !_.isArray(dataPackage.resources)) {
    return [];
  }

  var formats = {};
  _.forEach(dataPackage.resources, function(resource) {
    if (resource.format) {
      formats[resource.format] = true;
    }
  });
  return _.keys(formats);
}

function getUniqueFilterOptions(packages) {
  var authors = {};
  var regions = {};
  var countries = {};
  var cities = {};
  var formats = {};

  _.forEach(packages, function(dataPackage) {
    if (!_.isObject(dataPackage)) {
      return;
    }

    if (dataPackage.author) {
      authors[dataPackage.author] = true;
    }

    if (_.isArray(dataPackage.regionCode)) {
      _.forEach(dataPackage.regionCode, function(item) {
        regions[item] = true;
      });
    } else {
      if (dataPackage.regionCode) {
        regions[dataPackage.regionCode] = true;
      }
    }

    if (_.isArray(dataPackage.countryCode)) {
      _.forEach(dataPackage.countryCode, function(item) {
        countries[item] = true;
      });
    } else {
      if (dataPackage.countryCode) {
        countries[dataPackage.countryCode] = true;
      }
    }

    if (_.isArray(dataPackage.cityCode)) {
      _.forEach(dataPackage.cityCode, function(item) {
        cities[item] = true;
      });
    } else {
      if (dataPackage.cityCode) {
        cities[dataPackage.cityCode] = true;
      }
    }

    if (_.isArray(dataPackage.resources)) {
      _.forEach(dataPackage.resources, function(resource) {
        if (resource.format) {
          formats[resource.format] = true;
        }
      });
    }
  });

  var result = {
    authors: _.keys(authors),
    regions: _.keys(regions),
    countries: _.keys(countries),
    cities: _.keys(cities),
    formats: _.keys(formats)
  };

  _.forEach(result, function(values) {
    if (values.length < 1) {
      values.splice(0, values.length);
    }
  });

  return result;
}

module.exports.getResourceFormats = getResourceFormats;
module.exports.getUniqueFilterOptions = getUniqueFilterOptions;
