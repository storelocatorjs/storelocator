# CHANGELOG test

## 2.1.0

### Updates

- Move CI from Travis to Github Actions

### Fixes

- Fix sticky nav displayed above the map on the demo [#26](https://github.com/yoriiis/storelocatorjs/issues/26)

### Updates

## 2.0.2

### Updates

- Bumps `eslint-plugin-node` from 5.2.1 to 6.0.1
- Bumps `eslint` from 4.18.2 to 4.19.1
- Bumps `@babel/preset-env` from 7.4.5 to 7.7.7
- Bumps `stylelint-config-standard` from 18.3.0 to 19.0.0
- Bumps `postcss-import` from 11.0.0 to 12.0.1
- Bumps `eslint-plugin-standard` from 3.0.1 to 3.1.0
- Bumps `webpack-cli` from 3.2.3 to 3.3.10
- Bumps `@babel/core` from 7.4.5 to 7.7.7
- Bumps `webpack` from 4.41.2 to 4.41.4
- Bumps `eslint-config-standard` from 10.2.1 to 11.0.0
- Bumps `terser-webpack-plugin` from 2.2.1 to 2.3.1
- Bumps `optimize-css-assets-webpack-plugin` from 5.0.1 to 5.0.3
- Bumps `eslint-plugin-import` from 2.8.0 to 2.19.1
- Bumps `postcss-loader` from 2.1.6 to 3.0.0
- Bumps `@babel/plugin-transform-modules-commonjs` from 7.7.0 to 7.7.5
- Bumps `file-loader` from 1.1.11 to 5.0.2
- Bumps `style-loader` from 0.21.0 to 1.0.2
- Bumps `css-loader` from 1.0.0 to 3.4.0
- Bumps `webpack-manifest-plugin` from 2.0.3 to 2.2.0
- Bumps `mini-css-extract-plugin` from 0.4.1 to 0.8.2
- Bumps `eslint-plugin-promise` from 3.6.0 to 4.2.1
- Bumps `progress-bar-webpack-plugin` from 1.11.0 to 1.12.1
- Bumps `babel-eslint` from 8.0.1 to 10.0.3
- Bumps `postcss-nested` from 3.0.0 to 4.2.1

## 2.0.1

### Updates

- Add npm keywords

## 2.0.0

### New features

- Add all sources of the storelocatorjs project, including:
  - CSS
  - JS
  - Documentation with MkDocs build
  - Webpack configuration
  - Examples
  - Cloud functions
- Add the cloud function from Google Firebase
- New folder structure
- Add `ESLint` with `Standard JS` on the project with associated npm scripts
- Add `StyleLint` configuration on the project with associated npm scripts
- Add `Babel` configuration on the project
- Add `postCSS` configuration on the project
- Add `browserslistrc` files for browsers support
- Add Travis builds: `stylelint`, `eslint` and `mkdocs build`
- Add `JSDoc` configuration file and all code comments
- Add `Makefile` to manage scripts: `install` and `lint`
- Add `Material for MkDocs` to build the documentation website
- Add `Webpack` configuration
- Add `./examples` folder with storelocatorjs examples
- Add `.github` folder with `ISSUE_TEMPLATE` and `PULL_REQUEST_TEMPLATE`
- Add `./dist` folder with storelocatorjs assets
- Add `CHANGELOG` file
- Add `.editorconfig` file

### Updates

- Add prefix `.storelocator-` before all CSS classes use by storelocatorjs to prevent conflicts
- Rename all CSS class with [FUN](https://benfrain.com/enduring-css-writing-style-sheets-rapidly-changing-long-lived-projects/#h-H2_5) methodology

## 1.0.0

### New features

- First release of storelocatorjs
- Update README
