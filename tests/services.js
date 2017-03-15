'use strict';

var _ = require('lodash');
var nock = require('nock');
var assert = require('chai').assert;
var search = require('../app/scripts/services/search');

describe('Services', function() {
  describe('Search API', function() {
    before(function(done) {
      search.searchApiUrl = 'http://search.example.com';

      nock('http://search.example.com')
        .persist()
        .get('/?size=10000')
        .reply(200, require('./data/packages.json'), {
          'access-control-allow-origin': '*'
        });

        done();
    });

    it('Should get all datapackages', function(done) {
      search.getAllDataPackages()
        .then(function(items) {
          assert.isAbove(items.length, 0);
          done();
        })
        .catch(done);
    });

    it('Should perform search', function(done) {
      search.getAllDataPackages()
        .then(function(packages) {
          return search.performSearch(packages, {
            q: '',
            filter: {}
          })
        })
        .then(function(searchResults) {
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
          done();
        })
        .catch(done);
    });
  });
});
