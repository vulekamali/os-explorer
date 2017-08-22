'use strict';

var _ = require('lodash');
var config = require('config');

function upper(v) {
  return (v + '').toUpperCase();
}

function processFetchResponse(response) {
  if (response.status != 200) {
    throw new Error('Failed loading data from ' + response.url);
  }
  return response.text().then(JSON.parse);
}

function getItemsFromSource(source) {
  var url = config.cosmopolitanUrl;

  var options = {
    method: 'GET'
  };

  return fetch(url, options).then(processFetchResponse)
    .then(function(sources) {
      if (!sources[source]) {
        throw new Error('Source "' + source + '" is not available');
      }

      var allResults = [];
      var fetchNext = function(url, options) {
        return fetch(url, options).then(processFetchResponse)
          .then(function(results) {
            if (_.isArray(results.results)) {
              allResults = _.concat(allResults, results.results);
            }
            if (_.isArray(results)) {
              allResults = _.concat(allResults, results.results);
            }
            if (!!results.next) {
              return fetchNext(results.next, options);
            }
            return allResults;
          });
      };
      return fetchNext(sources[source], options);
    });
}

function getCountries() {
  return getItemsFromSource('countries').then(function(items) {
    return _.map(items, function(item) {
      return {
        code: upper(item.id),
        name: item.name,
        continent: _.isObject(item.continent) ? item.continent.id : null,
        currency: _.isObject(item.currency) ? upper(item.currency.id) : null
      };
    });
  });
}

function getContinents() {
  return getItemsFromSource('continents').then(function(items) {
    return _.map(items, function(item) {
      return {
        code: item.id,
        name: item.name
      };
    });
  });
}

function getCurrencies() {
  return getItemsFromSource('currencies').then(function(items) {
    return _.map(items, function(item) {
      return {
        name: item.name,
        code: upper(item.id)
      };
    });
  });
}

module.exports.getCountries = getCountries;
module.exports.getContinents = getContinents;
module.exports.getCurrencies = getCurrencies;
