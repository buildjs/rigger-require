var async = require('async'),
    debug = require('debug')('rigger-require'),
    deps = require('module-deps'),
    resolve = require('resolve');

function combineItems(items) {
    var output = [],
        entryPoints;

    function resolveDependency(name, path) {
        var resolveTarget, key;

        // if the dependency is relative, then throw an error as this is not yet supported
        if (name.charAt(0) === '.') throw new Error('Unable to require relative file: ' + name);

        // find the required file
        debug('resolving dependency: ' + name);
        resolveTarget = items.filter(function(item) {
            return item.id === path;
        })[0];

        // if the resolve target was not found, then throw an error
        if (! resolveTarget) throw new Error('Could not resolve dependency: ' + name);

        // iterate through the resolve target, dependencies and resolve those
        for (key in resolveTarget.deps) {
            resolveDependency(key, resolveTarget.deps[key]);
        }

        // add this source to the output
        output.push(resolveTarget.source);
    }

    // get the entry point items
    entryPoints = items.filter(function(item) {
        return item.entry;
    });

    // iterate through the entry points and generate the output
    entryPoints.forEach(function(item) {
        // iterate through the dependencies
        for (var key in item.deps) {
            resolveDependency(key, item.deps[key]);
        }

        // push this item souce to the output
        output.push(item.source);
    });

    return output.join('\n');
}

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
                try {
                    scope.done(null, combineItems(items));
                }
                catch (e) {
                    scope.done(e);
                }
            });
    });
};