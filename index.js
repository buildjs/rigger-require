var async = require('async'),
    debug = require('debug')('rigger-require'),
    deps = require('module-deps'),
    resolve = require('resolve');

exports = module.exports = function(rigger, targets) {
    var scope = this,
        items = [];

    function resolveTarget(target, callback) {
        return resolve(target, { basedir: rigger.csd }, callback);
    }

    targets = targets.split(/\,\s*/);
    debug('targets requested: ' + targets);

    // get the targets
    async.map(targets, resolveTarget, function(err, results) {
        if (err) return scope.done(err);

        // convert the targets into an array
        deps(results)
            .on('data', function(data) {
                items.push(data);
            })
            .on('end', function() {
                scope.done(null, items.map(function(item) {
                    return item.source;
                }).join('\n'));
            });
    });
};