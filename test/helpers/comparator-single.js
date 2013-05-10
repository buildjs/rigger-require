var assert = require('assert'),
    fs = require('fs');

module.exports = function(done, targetFile) {

    var comparison = fs.readFileSync(targetFile, 'utf-8');

    return {
        done: function(err, output) {
            assert.ifError(err);
            assert.equal(output, comparison);
            done();
        }
    };
};