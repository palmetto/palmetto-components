<p align="center">
  <a href="https://palmetto.com" rel="noopener" target="_blank"><img width="150" src="https://alchemy.palmetto.com/public//default_logo/1541461188.png" alt="Palmetto logo"></a></p>
</p>
<h1 align="center" style="border-bottom: none;">Contribution Guide</h1>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Raising an Issue](#raising-an-issue)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Guiding Principles for Development](#guiding-principles-for-development)
  - [1. Desktop and Mobile Support](#1-desktop-and-mobile-support)
  - [2. Cross Browser Compliance](#2-cross-browser-compliance)
  - [3. Accessibility](#3-accessibility)
  - [4. Use the palmetto-design-tokens Library Exclusively when Styling Components](#4-use-the-palmetto-design-tokens-library-exclusively-when-styling-components)
- [JS/JSX Style Guide](#jsjsx-style-guide)
- [CSS/Sass Style Guide](#csssass-style-guide)
- [Anatomy of a Component](#anatomy-of-a-component)
- [Writing Documentation / Stories](#writing-documentation--stories)
- [Testing Components](#testing-components)
- [Publishing components](#publishing-components)
- [Development Setup](#development-setup)
- [Releases](#releases)
  - [Release Types](#release-types)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

> Thanks for contributing!

## Raising an Issue

* Make sure the issue hasn't been raised yet.
* Tag issue accordingly using your best judgement. Do NOT create new tags. If you feel a new one is needed, raise it in your issue.
* If your issue is a bug, include **screenshots** or animated GIFs in your issue whenever needed (if visual issue).
* If your issue is a bug, include steps to reproduce, or link to reproducible issue, e.g.: Code Sandbox or similar. Please also provide additional details including device, browser, browser version etc.

## Submitting a Pull Request

* The ``master`` branch is the main branch, **and the one that you will open your PRs against**.
* Merging a PR to ``master`` will **not** result in a release. Releases are triggered by following the steps outlined in the [Releases](#releases) section below.
* Include **screenshots** or animated GIFs in your pull request whenever needed (if visual changes).
* It's OK, and even encouraged, to make multiple small commits as you work a feature branch - we have configured GitHub to automatically squash commits before merging.
* **DO NOT** commit the ``dist`` folder, use it only for generating builds locally and for testing on your end. In general, respect the .gitignore.
* If adding a new feature:
    * Provide a convincing reason to add this feature. Ideally you should open a suggestion issue first and have it green lighted before starting development.

## Guiding Principles for Development

### 1. Desktop and Mobile Support

All components **have** to be fully functional, **and** provide a great user experience on all devices.

### 2. Cross Browser Compliance

All components **must** be fully functional, and look good across all modern browsers, including Chrome, Firefox, Safari, and Edge.

### 3. Accessibility

We aim to strongly encourage the development of accessible components. With that:
* All components are expected to adhere to the HTML5 spec, and semantic elements should be used whenever possible.
* In cases where the use of semantic elements is not possible, aria attributes should be applied as necessary.
* In interactive components such as inputs, buttons, etc, keyboard interaction should be supported, in addition to mouse interaction.
* Components that wrap HTML elements must reflect this by including the necessary aria attributes.

In order to support the development of accessible components, this repo includes the following tools:
* The [eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y) plugin lints our JS/JSX. Any linting errors will be caught by CI, and a merge to ``master`` will be prevented until the issues are resolved.
* The [@storybook/addon-a11y](https://www.npmjs.com/package/@storybook/addon-a11y) has been added to Storybook. Our Storybook docs fully support the developer experience by providing helpful accessibility checks for any component rendered in the canvas.

For more information on web accessibility, visit: [W3C - Web Accessibility Initiative](https://www.w3.org/WAI/fundamentals/accessibility-intro/)

### 4. Use the palmetto-design-tokens Library Exclusively when Styling Components

Our component library is based on the [Palmetto Design Tokens](https://github.com/palmetto/palmetto-design-tokens) design system.

The design system provides us with a set of shared attributes used in the Palmetto Design System. These attributes include: colors, fonts, spacing, and more.
* The library provides the project with utility classes, scss, css, JS, and JSON variables.
* These classes and variables are imported globally in palmetto-components, and all styles are based on them.
* Tokens should NEVER be component-specific, however component variables can be derived from tokens. For e.g. (with sass): `$form-control-height-medium: $size-spacing-medium;`

If there are additional attributes that you feel should be included in Palmetto Design Tokens, [raise an issue here](https://github.com/palmetto/palmetto-design-tokens/issues).

## JS/JSX Style Guide

We follow the [AirBnB JS style guide](https://github.com/airbnb/javascript/tree/master/react), with a few exceptions. Adhere to the linter rules as much as possible. In cases where you can't, use `// eslint-disable-line`, etc., very, very sparingly. If a disable is needed, specify the exact rule that you are disabling.

For example: `// eslint-disable-line no-console`

##  CSS/Sass Style Guide

* TBD

## Anatomy of a Component

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
