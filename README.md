# rigger-require

The `rigger-require` plugin allows you to compile in compatible node modules into your rigger based compilation process.

## Example Usage

Consider the following `.js` file:

```js
//=require async

async.parallel(tasks, function(err) {
    console.log('tasks completed successfully'); 
});
```

When built using rigger (with the `rigger-require` plugin available in the project directory), [async](https://github.com/caolan/async) would be successfully imported into your source code.

## Installation

To use `rigger-require` in your project, include it within your `devDependencies` section of your project `package.json` file in addition to the node modules that you wish to use in your project.