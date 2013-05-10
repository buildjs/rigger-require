var assert = require('assert'),
    riggerReq = require('..'),
    rigger = require('./mocks/rigger'),
    path = require('path'),
    comparator = require('./helpers/comparator-single');

describe('simple resolution tests, single file include', function() {
    it('should be able to require async', function(done) {
        var scope = comparator(done, path.resolve(__dirname, '../node_modules/async/lib/async.js'));

        riggerReq.call(scope, rigger, 'async');
    });

    it('should be able to require formatter', function(done) {
        var scope = comparator(done, path.resolve(__dirname, '../node_modules/formatter/formatter.js'));

        riggerReq.call(scope, rigger, 'formatter');
    });
});