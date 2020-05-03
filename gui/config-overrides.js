const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    fixBabelImports('antd', {
      libraryDirectory: 'es',
    style: true,
    }),
  addLessLoader({
      javascriptEnabled: true,
      modifyVars: { 
        '@primary-color': '#011A27',
        '@layout-header-background': '#063852',
        '@layout-body-background': '#F5F5F5',
        '@text-color': '#000000',
        '@btn-primary-bg': '#F0810F'
      },
  }),
);