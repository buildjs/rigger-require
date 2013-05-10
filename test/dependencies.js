var assert = require('assert'),
    riggerReq = require('..'),
    rigger = require('./mocks/rigger'),
    path = require('path'),
    comparator = require('./helpers/comparator-multi');

describe('traverse dependencies', function() {
    it('should be able to require gedi', function(done) {
        var scope = comparator(done, [
                path.resolve(__dirname, '../node_modules/gedi/node_modules/gel-js/node_modules/lang-js/lang.js'),
                path.resolve(__dirname, '../node_modules/gedi/node_modules/gel-js/gel.js'),
                path.resolve(__dirname, '../node_modules/gedi/gedi.js')
            ]);

        riggerReq.call(scope, rigger, 'gedi');
    });
});