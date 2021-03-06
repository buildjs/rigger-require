# rigger-require

The `rigger-require` plugin allows you to compile in compatible node modules into your rigger based compilation process.

## NOTE:

This package has been deprecated as the we have all gotten a lot better at segmenting our packages into smaller component files.  This in turn makes `rigger-require` pretty useless.  If you are still using `rigger` then it's likely the [`rigger-browserify`](https://github.com/buildjs/rigger-browserify) will be much more useful to you.

## Example Usage

Consider the following `.js` file:

```js
//=require async

async.parallel(tasks, function(err) {
    console.log('tasks completed successfully'); 
});
```

When built using rigger (with the `rigger-require` plugin available in the project directory), [async](https://github.com/caolan/async) would be successfully imported into your source code.

Under the hood [module-deps](https://github.com/substack/module-deps) is used to resolve external dependencies that are required within a project.  For instance:

```js
//=require gedi

// Gedi, Gel and Lang are now all in scope after building
```

At this stage, only files using a [UMD](http://github.com/umdjs/umd) compatible header can be used as `rigger-require` does not shim in a `require` function.

If you are looking for this kind of functionality, then you should have a look at using either [browserify](https://github.com/substack/node-browserify) or [component](https://github.com/component/component).

## Installation

To use `rigger-require` in your project, include it within your `devDependencies` section of your project `package.json` file in addition to the node modules that you wish to use in your project.

