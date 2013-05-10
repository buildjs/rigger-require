var assert = require('assert'),
    fs = require('fs');

module.exports = function(done, targets) {

    var comparison = targets.map(function(target) {
            return fs.readFileSync(target, 'utf-8');
        }).join('\n');

    return {
        done: function(err, output) {
            assert.ifError(err);
            assert.equal(output, comparison);
            done();
        }
    };
};