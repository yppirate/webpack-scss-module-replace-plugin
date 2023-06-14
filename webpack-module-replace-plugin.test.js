const fs = require('fs');
const WebpackModuleReplacePlugin = require('./webpack-module-replace-plugin');

describe('WebpackModuleReplacePlugin', () => {
  let compilation;
  let plugin;

  beforeEach(() => {
    compilation = {
      assets: {
        'styles.scss': {
          source: () =>
            'body { color: red; } .module__container { background: blue; }',
          size: () => 43,
        },
        'header.scss': {
          source: () =>
            '.header__title { font-size: 24px; } .header__logo { width: 100px; }',
          size: () => 51,
        },
      },
    };

    plugin = new WebpackModuleReplacePlugin();
  });

  it('replaces "module__" with "__" in SCSS files', () => {
    plugin.apply({
      hooks: {
        emit: {
          tapAsync: (name, callback) => {
            plugin.collectSCSSFiles(compilation);
            plugin.replaceModuleString = jest.fn();

            plugin.apply(null, callback);

            expect(plugin.replaceModuleString).toHaveBeenCalledTimes(2);
            expect(plugin.replaceModuleString).toHaveBeenCalledWith({
              name: 'styles.scss',
              content:
                'body { color: red; } .module__container { background: blue; }',
            });
            expect(plugin.replaceModuleString).toHaveBeenCalledWith({
              name: 'header.scss',
              content:
                '.header__title { font-size: 24px; } .header__logo { width: 100px; }',
            });
          },
        },
      },
    });
  });

  it('replaces "module__" with "__" in a single SCSS file', () => {
    const file = {
      name: 'styles.scss',
      content: 'body { color: red; } .module__container { background: blue; }',
    };

    plugin.replaceModuleString(file);

    expect(compilation.assets[file.name].source()).toBe(
      'body { color: red; } .__container { background: blue; }'
    );
  });
});
