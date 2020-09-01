<p align="center">
  <a href="https://palmetto.com" rel="noopener" target="_blank"><img width="150" src="https://alchemy.palmetto.com/public//default_logo/1541461188.png" alt="Palmetto logo"></a></p>
</p>
<h1 align="center" style="border-bottom: none;">Contribution Guide</h1>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Raising an Issue](#raising-an-issue)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Principles](#principles)
  - [1. Desktop and Mobile support](#1-desktop-and-mobile-support)
  - [2. Accessibility](#2-accessibility)
  - [3. When writing styles, do not deviate from existing tokens found in palmetto-design-tokens library](#3-when-writing-styles-do-not-deviate-from-existing-tokens-found-in-palmetto-design-tokens-library)
- [JS Style Guide](#js-style-guide)
- [Sass/CSS Style Guide](#sasscss-style-guide)
- [Writing Components](#writing-components)
- [Writing Documentation / Stories](#writing-documentation--stories)
- [Testing Components](#testing-components)
- [Publishing components](#publishing-components)
- [Development Setup](#development-setup)
- [Releases](#releases)
  - [Release Types](#release-types)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

> Thanks for contributing!

## Raising an Issue

* Make sure the issue hasn't been raised yet
* Tag issue accordingly using your best judgement. Do NOT create new tags. If you feel a new one is needed, raise it in your issue.
* If bug, include **screenshots** or animated GIFs in your issue whenever needed (if visual issue)
* If bug, include steps to reproduce, or link to reproducible issue, E.G: Code Sandbox or similar.

## Submitting a Pull Request

* The ``master`` branch is a snapshot of the latest release. **Submit your PR in the ``develop`` branch**
* Include **screenshots** or animated GIFs in your pull request whenever needed (if visual changes)
* It's OK to have multiple small commits as you work on the PR - we will let GitHub automatically squash it before merging
* **DO NOT** commit the ``lib`` and ``dist`` folder, use it only for testing on your end. In general just respect the .gitignore.
* If adding new feature:
    * Provide convincing reason to add this feature. Ideally you should open a suggestion issue first and have it greenlighted before working on it

## Principles

### 1. Desktop and Mobile support

It has to work, **and** have great UX on both platforms.

### 2. Accessibility

We aim to enforce accessibility (a11y) seriously and components that wrap HTML elements must reflect this by include the necessary aria attributes.

There are some of cases where the correct a11y is only possible to add in the library consumer's code, but in general we should do as much as possible on our side. Our storybook docs fully support the developer experience here, providing helpful accessibility checks for any components rendered in the canvas.

### 3. When writing styles, do not deviate from existing tokens found in palmetto-design-tokens library

Our entire component library is based around this design system. https://github.com/palmetto/palmetto-design-tokens

If you are unfamiliar with it, feel free to fork that repo and get a better understanding of how it works.

A short description is as follows:
* Tokens are defined in JSON form, in palmetto-design-tokens.
* When palmetto-design-tokens is built, it will generate utility classes, scss, and css variables based on these tokens.
* These classes and variables are imported globally in palmetto-components, and all styles are based on them.
* Tokens should NEVER be component-specific, however component variables can be derived from tokens. E.G (with sass): `$form-control-height-medium: $size-spacing-medium;`

## JS Style Guide

We mostly follow the [AirBnB JS style guide](https://github.com/airbnb/javascript/tree/master/react) with few exceptions. Just follow linter rules as much as possible. Please use `// eslint-disable-line` very, very sparingly. If a disable is needed, please specify the rule you are disabling.

E.G: `// eslint-disable-line no-console`

##  Sass/CSS Style Guide

* TBD

## Writing Components

Most if not all components in this library should be **controlled** components. Meaning that they hold no internal state. For an example of code structure for most components, review an existing component and adhere to the structure that you see. Some general rules:

* Follow order of PropType declarations (before/above component markup).
* Always include `defaultProps` for non-required propTypes.
* Whenever possible break components down into subcomponents, since this encourages re-usability and encapsulation further down the line. (use your best judgement). This is preferrable to smaller render functions within a single component since it makes testing more straightforward.
* Try your best to not abstract away standard expected functionality. E.G: always return dispatched events to the user, and ensure that HTMl APIs are as complete as possible. If you feel prop spreading is needed to shore up missing props for a native HTML element, that is ok, but do so with caution since this will circumvent propTypes validation.

## Writing Documentation / Stories

We use storybook to document components. Any new component, or addition to a component API must have a corresponding story where it's showcased.

* Follow MDX format for writing stories. See `Button.stories.jsx` for a good example of this.
* Ensure all components include a summary description at the top (which will get pulled in to storybook automatically).
* Always add prop descriptions (see other components for reference) so that prop tables are populated accordingly.

## Testing Components

We use **jest** and **react-testing-library** for all tests. We discourage the use of snapshot testing instead opting to test desired functionality of a component. General guidelines:

* Do not test implementation details, E.G: the name of a function changed (again, no snapshot testing).
* Try do write result-oriented tests. E.G: when an change event happens, my onChange handler was properly invoked.
* Test whether components render with the correct props in their different states.
* Test that required props are properly throwing warnings (examples in existing components). This guards against somebody removing a prop requirement inadvertedly.

We use Code Climate reports for test coverage. Our expectation for any new PR getting merged is that the new feature must satisfy at least 95% coverage. It will not get approved otherwise.

## Publishing components

In order to ensure that a new component gets included in the library it must be imported and included in the corresponding export of `src/components/index.js`.

## Development Setup

You need [Node.js](http://nodejs.org/) **version >= 6 and <= 11**.

After cloning the repo, run:

```bash
$ yarn
```

Scripts for local development:

```bash
# serve storybook stories/docs with hot reload at localhost:6006
$ yarn storybook

# build lib in /dist folder
$ yarn build

# build docs in /storybook-static folder
$ yarn build-storybook

# run jest test-runner
$ yarn test

# run eslint
$ yarn lint
```

This library is meant to be added as a dependency to React apps. Aside from sandbox testing in storybook, you can also test any changes or new features by following these steps:

Build locally by running `yarn build`

In order to test any local changes you'll need to build the library, and symlink your local package into any project that consumes it. See [NPM link](https://docs.npmjs.com/cli/link) or [Yarn link](https://classic.yarnpkg.com/en/docs/cli/link/) for more details.

## Releases

Palmetto-Components uses the [semantic-release](https://github.com/semantic-release/semantic-release) npm package to fully automate the release workflow. Instead of manually updating the release version in package.json, and creating a new release tag in GitHub for each release, they are automatically triggered by prefixing the commit message when merging to master. Upon triggering a release, the package version is bumped depending on the type specified, a release tag is created in GitHub, and the new version is automatically published to npm.

For example, opening a PR to master with the commit message `fix: Resolve bug` will trigger a minor release and bump the package's version from `0.0.0` to `0.0.1`.

The link above provides full documentation for this workflow. However, a comprehensive list of the prefix types, and their intended uses are provide below for quick reference:

### Release Types
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
