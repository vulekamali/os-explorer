'use strict';

var _ = require('lodash');
var assert = require('chai').assert;
var search = require('../app/scripts/services/search');
var utils = require('../app/scripts/services/utils');

describe('Services', function() {
  describe('Search API', function() {
    it('Should get 0..10 datapackages', function(done) {
      search.getPackages(10).then(function(items) {
        var condition = (items.length > 0) && (items.length <= 10);
        assert(condition, 'Items count should be between 0 and 10');
        done();
      });
    });

    it('Should find some datapackages', function(done) {
      var options = {
        'package': {
          name: 'Boost'
        }
      };

      search.searchPackages(options).then(function(items) {
        assert.isAbove(items.length, 0);
        done();
      });
    });
  });

  describe('Utils', function() {
    it('Should get unique resource formats', function(done) {
      var packages = require('./data/packages.json');
      var formats = utils.getResourceFormats(_.first(packages));
      assert.deepEqual(formats, ['csv']);
      done();
    });

    it('Should get filter options', function(done) {
      var packages = require('./data/packages.json');
      var options = utils.getUniqueFilterOptions(packages);
      assert.deepEqual(options, {
        authors: [
          'Daniel Fowler <daniel.fowler@not.shown>',
          'Victoria Vlad <victoriavladd@not.shown>',
          'Cecile LeGuen <cecile.leguen@not.shown>',
          'Goran Rizaov <rizagor@not.shown>',
          'Michael Leow <leow@not.shown>'
        ],
        regions: ['sa', 'eu', 'as'],
        countries: ['PE', 'MD', 'AM', 'MK', 'PY', 'RU', 'MY'],
        cities: ['Skopje', 'PJ'],
        formats: ['csv']
      });
      done();
    });
  });
});
