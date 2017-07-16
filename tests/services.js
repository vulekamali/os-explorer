'use strict';

var nock = require('nock');
var assert = require('chai').assert;
var search = require('../app/scripts/services/search');

describe('Services', function() {
  describe('Search API', function() {
    before(function(done) {
      search.searchApiUrl = 'http://search.example.com';

      nock(search.searchApiUrl)
        .persist()
        .get('/')
        .query({
          size: 10000
        })
        .reply(200, require('./data/packages'), {
          'access-control-allow-origin': '*'
        });

      done();
    });

    it('Should get all datapackages', function() {
      return search.getAllDataPackages()
        .then(function(items) {
          assert.isAbove(items.length, 0);
        });
    });

    it('Should perform search', function() {
        return search.performSearch({
          q: '',
          filter: {}
        }).then(function(searchResults) {
          assert.isAbove(searchResults.items.length, 0);
          assert.deepEqual(searchResults.options, {
            authors: [
              'Cecile LeGuen <cecile.leguen@not.shown>',
              'Daniel Fowler <daniel.fowler@not.shown>',
              'Goran Rizaov <rizagor@not.shown>',
              'Michael Leow <leow@not.shown>',
              'Victoria Vlad <victoriavladd@not.shown>'
            ],
            regions: ['as', 'eu', 'sa'],
            countries: ['AM', 'MD', 'MK', 'MY', 'PE', 'PY', 'RU'],
            cities: ['PJ', 'Skopje']
          });
        });
    });
  });
});
