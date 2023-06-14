const fs = require('fs');

class WebpackModuleReplacePlugin {
  constructor() {
    this.scssFiles = [];
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('WebpackModuleReplacePlugin', (compilation, callback) => {
      this.collectSCSSFiles(compilation);

      this.scssFiles.forEach((file) => {
        this.replaceModuleString(file);
      });

      callback();
    });
  }

  collectSCSSFiles(compilation) {
    Object.keys(compilation.assets).forEach((filename) => {
      if (filename.endsWith('.scss')) {
        const file = compilation.assets[filename].source();
        this.scssFiles.push({ name: filename, content: file });
      }
    });
  }

  replaceModuleString(file) {
    const updatedContent = file.content.replace(/module__/g, '__');
    compilation.assets[file.name] = {
      source: () => updatedContent,
      size: () => updatedContent.length,
    };
  }
}

module.exports = WebpackModuleReplacePlugin;
