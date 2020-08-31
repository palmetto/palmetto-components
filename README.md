# Palmetto Components [![Publish To NPM](https://github.com/palmetto/palmetto-components/workflows/Publish%20To%20NPM/badge.svg)](https://github.com/palmetto/palmetto-components/actions?query=workflow%3A%22Publish+To+NPM%22) [![Chromatic](https://github.com/palmetto/palmetto-components/workflows/Chromatic/badge.svg?branch=master)](https://github.com/palmetto/palmetto-components/actions?query=workflow%3AChromatic) [![Test Coverage](https://api.codeclimate.com/v1/badges/e61e897623b87d91d155/test_coverage)](https://codeclimate.com/github/palmetto/palmetto-components/test_coverage)

A React component library to power all Palmetto UI. 

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Quick Start](#quick-start)
  - [1. Install](#1-install)
  - [2. import global scss/css](#2-import-global-scsscss)
  - [3. Use in React component](#3-use-in-react-component)
- [Documentation / Storybook](#documentation--storybook)
- [Contributing](#contributing)
- [Releases](#releases)
  - [Type](#type)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Quick Start

### 1. Install
`yarn add @palmetto/palmetto-components`

### 2. import global scss/css
```
/* main.css or main.scss */
@import '~@palmetto/palmetto-components/dist/scss/utilities.scss';
@import '~@palmetto/palmetto-components/dist/scss/variables.scss';
```

### 3. Use in React component
`import { TextInput } from '@palmetto/palmetto-components'`


## Documentation / Storybook

[SEE FULL DOCS HERE](https://master--5ed9214b642dc10022b50a2d.chromatic.com)

## Contributing

Issues and PRs welcome! See [HERE](https://github.com/palmetto/palmetto-components/blob/develop/.github/CONTRIBUTING.md) for contribution guide.

## Releases

Palmetto-Components uses the [semantic-release](https://github.com/semantic-release/semantic-release) npm package to fully automate the release workflow. Instead of manually updating the release version in package.json, and creating a new release tag in GitHub for each release, releases are automatically triggered by prefixing the commit message when merging to master. Upon triggering a release, the package version is bumped depending on the type of release specified, a release tag is created in GitHub, and the new version is automatically published to npm.

For example, opening a PR to master with the commit message `fix: Resolve bug` will trigger a minor release and bump the package's version from `0.0.0` to `0.0.1`.

The link above provides full documentation for this workflow. However, a comprehensive list of the prefix types, and their intended uses are provide below for quick reference:

### Type
Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing or correcting existing tests
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation
  generation




