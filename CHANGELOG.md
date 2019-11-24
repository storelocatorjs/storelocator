# 3.0.0

#### New features

* Add all sources of the vLitejs project, including:
    * CSS
    * JS
    * Documentation with MkDocs build
    * Webpack configuration
    * Examples
* New folder structure
* Add `ESLint` with `Standard JS` on the project with associated npm scripts
* Add `StyleLint` configuration on the project with associated npm scripts
* Add `Babel` configuration on the project
* Add `postCSS` configuration on the project
* Add `browserslistrc` files for browsers support
* Add Travis builds: `stylelint`, `eslint` and `mkdocs build`
* Add `JSDoc` configuration file and all code comments
* Add `Material for MkDocs` to build the documentation website
* Add `Webpack` configuration
* Add `./examples` folder with vLitejs examples
* Add `.github` folder with `ISSUE_TEMPLATE` and `PULL_REQUEST_TEMPLATE`
* Add `./dist` folder with vLitejs assets
* Add `CHANGELOG` file
* Add `.editorconfig` file

#### Removed

* Remove specific build file for `html5` player only or `youtube` player only. We keep only one bundle compatible with `html5` and `youtube`

#### Updates

* Rename the export of the `vLite` constructor to` vlitejs`
* Rename `timeline` option to `progressBar`
* Rename `callback` option to `onReady`
* Rename CSS class prefixes from `.vl-` to `.v-`
* Rename all CSS class with [FUN](https://benfrain.com/enduring-css-writing-style-sheets-rapidly-changing-long-lived-projects/#h-H2_5) methodology

#### Fixes

* Fix autoplay option that does not work with browser policy without user gesture. Muted option is forced to solved the problem.
