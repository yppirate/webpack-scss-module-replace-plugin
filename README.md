# Webpack Module Replace Plugin

The Webpack Module Replace Plugin is a plugin for Webpack that automatically searches for "module__" strings in SCSS files and replaces them with "__". This plugin can help simplify class names in your SCSS codebase by removing the "module__" prefix.

## Installation

You can install the plugin via NPM:

```shell
npm install webpack-module-replace-plugin --save-dev 
```
## Usage

In your Webpack configuration file, require the plugin and add an instance of it to the `plugins` array:

```javascript
const WebpackModuleReplacePlugin = require('webpack-module-replace-plugin');

module.exports = {
  // ... other webpack configuration options
  plugins: [
    new WebpackModuleReplacePlugin()
  ]
};
``` 

The plugin will run during the Webpack build process and replace all occurrences of "module__" in your SCSS files with "__".
