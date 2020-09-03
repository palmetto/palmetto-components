<p align="center">
  <a href="https://palmetto.com" rel="noopener" target="_blank"><img width="150" src="https://alchemy.palmetto.com/public//default_logo/1541461188.png" alt="Palmetto logo"></a></p>
</p>
<h1 align="center" style="border-bottom: none;">Contribution Guide</h1>
<span id="top"></span>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Introduction](#introduction)
- [Installation](#installation)
- [Developing Locally](#developing-locally)
  - [Available Scripts](#available-scripts)
    - [Storybook](#storybook)
    - [Test](#test)
    - [Lint](#lint)
    - [Build](#build)
    - [TypeScript](#typescript)
    - [Documentation](#documentation)
  - [Testing Locally](#testing-locally)
- [Guiding Principles for Development](#guiding-principles-for-development)
  - [1. Desktop and Mobile Support](#1-desktop-and-mobile-support)
  - [2. Cross Browser Compliance](#2-cross-browser-compliance)
  - [3. Accessibility](#3-accessibility)
  - [4. Strive for Exceptional Code Quality](#4-strive-for-exceptional-code-quality)
    - [JS/JSX Style Guide](#jsjsx-style-guide)
    - [CSS/Sass Style Guide](#csssass-style-guide)
  - [5. Use the Palmetto Design Tokens Library Exclusively when Styling Components](#5-use-the-palmetto-design-tokens-library-exclusively-when-styling-components)
- [Building a Component](#building-a-component)
  - [Component](#component)
    - [Example](#example)
  - [Styles](#styles)
    - [Example](#example-1)
  - [Storybook Documentation](#storybook-documentation)
  - [Testing](#testing)
    - [Example](#example-2)
  - [Publishing](#publishing)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Releases](#releases)
  - [Release Types](#release-types)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

> Thanks for contributing!

## Introduction
[↥ back to top](#top)

The Palmetto Component Library powers all of Palmetto's UI. The project is open source and licensed under the terms of the [MIT license](/LICENSE). Feel free to add the library to your projects and use without restriction. Since it's open source, Palmetto both welcomes and encourages contributions. Use this guide to get up and running with the project, and begin building your first component.




## Installation
[↥ back to top](#top)

You need [Node.js](http://nodejs.org/) **version >= 6 and <= 11**.

After cloning the repo, run:

`yarn`





## Developing Locally
[↥ back to top](#top)

### Available Scripts

In the project directory, you can run:

  #### Storybook

  `yarn storybook`

  Serve [Storybook](https://storybook.js.org/) stories/docs with hot reload at localhost:6006.

  #### Test

  `yarn test`

  Run a single pass of the [Jest](https://jestjs.io/en/) test-runner.<br /> 
  In addition to running tests, this script outputs a test coverage summary.

  `yarn test:watch`

  Run the Jest test-runner in watch mode.

  #### Lint

  `yarn lint-js`

  Lint JS using [ESLint](https://eslint.org/).

  `yarn lint-js:fix`

  Lint JS, and have ESLint try to fix as many issues as possible.

  `yarn lint-styles`

  Lint styles using [Stylelint](https://stylelint.io/).

  `yarn lint-styles:fix`

  Lint styles, and have Stylelint try to fix as many issues as possible.

  #### Build

  `yarn build`

  Build library in the /dist folder.

  `yarn build-storybook`

  Build docs in /storybook-static folder.

  #### TypeScript

  `yarn type-check`

  Run a single pass of [type-check](https://www.typescriptlang.org/).

  `yarn type-check:watch`

  Run type-check in watch mode.

#### Documentation

`yarn generate-readme-toc`

[Automatically generate the TOC](https://github.com/thlorenz/doctoc) in this file. Note that the TOC will be automatically generated pre-commit using the git pre-commit hook. However, you might need to update the TOC as you are editing this README in order to validate that the TOC is correct, before committing changes.

### Testing Locally

This library is meant to be added as a dependency to React apps. Aside from sandbox testing in [Storybook](https://storybook.js.org/), you can also test any changes or new features by following these steps:

1) Build locally by running `yarn build`.

2) Symlink your local package into any project that consumes it. See [NPM link](https://docs.npmjs.com/cli/link) or [Yarn link](https://classic.yarnpkg.com/en/docs/cli/link/) for more details.




## Guiding Principles for Development
[↥ back to top](#top)

### 1. Desktop and Mobile Support

All components **must** be fully functional, **and** provide a great user experience, on all devices.

### 2. Cross Browser Compliance

All components **must** be fully functional, and look good across all modern browsers, including Chrome, Firefox, Safari, and Edge.

### 3. Accessibility

We aim to strongly encourage the development of accessible components. With that:
* All components are expected to adhere to the HTML5 spec, and semantic elements should be used whenever possible.
* In cases where the use of semantic elements is not possible, [aria](https://www.w3.org/WAI/standards-guidelines/aria/) attributes should be applied as necessary.
* In interactive components such as inputs, buttons, etc, keyboard interaction **should** be supported, in addition to mouse interaction.
* Components that wrap HTML elements must reflect this by including the necessary aria attributes.

In order to support the development of accessible components, this repo includes the following tools:
* The [eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y) plugin lints our JS/JSX. Any linting errors will be caught by CI, and a merge to ``master`` will be prevented until the issues are resolved.
* The [@storybook/addon-a11y](https://www.npmjs.com/package/@storybook/addon-a11y) has been added to Storybook. Our Storybook docs fully support the developer experience by providing helpful accessibility checks for any component rendered in the canvas.

For more information on web accessibility, visit: [W3C - Web Accessibility Initiative](https://www.w3.org/WAI/fundamentals/accessibility-intro/)

### 4. Strive for Exceptional Code Quality

Our component library values exceptional code quality in order to reduce the occurrence of bugs, and improve the developer experience. In order to achieve this, we test and lint our code extensively. In addition to [testing](#testing), we adhere to multiple CSS/JS/JSX style guides to standardize the way that components are built:

#### JS/JSX Style Guide

We follow the [AirBnB JS](https://github.com/airbnb/javascript/tree/master/react) style guide, with a few exceptions. Adhere to the linter rules as much as possible. In cases where you can't, use `// eslint-disable-line`, very, very sparingly. If a disable is needed, specify the exact rule that you are disabling.

For e.g: `// eslint-disable-line no-console`

####  CSS/Sass Style Guide

* We strictly adhere to the [Concentric CSS Model](https://rhodesmill.org/brandon/2011/concentric-css/) for organizing our CSS properties. If any properties are out of order when a PR is opened, the build will fail until the issues are corrected.

### 5. Use the Palmetto Design Tokens Library Exclusively when Styling Components

Our component library is based on the [Palmetto Design Tokens](https://github.com/palmetto/palmetto-design-tokens) design system.

The design system provides us with a set of shared attributes used in the Palmetto Design System. These attributes include: colors, fonts, spacing, and more.
* The library provides the project with utility classes, scss, css, JS, and JSON variables.
* These classes and variables are imported globally in palmetto-components, and all styles are based on them.
* Tokens should NEVER be component-specific, however component variables can be derived from tokens. For e.g. (with Sass): `$form-control-height-medium: $size-spacing-medium;`

If there are additional attributes that you feel should be included in Palmetto Design Tokens, [raise an issue here](https://github.com/palmetto/palmetto-design-tokens/issues).




## Building a Component
[↥ back to top](#top)

Each Component consists of the following files:

```
Component
│   Component.tsx
│   Component.module.scss  
│   Component.stories.mdx   
│   Component.test.jsx
│   ComponentTypes.ts (if necessary)
│
└───SubComponent
    │   SubComponent.tsx
    │   ...
```

### Component

Most, if not all components in this library should be **controlled** components. Meaning that they hold no internal state. 

A review of existing components will reveal that the library follows a set pattern for their organization; please review the components, and adhere to the structure that you see. Some general rules:

1) Imports are organized in the following order:
    1) Vendor
    2) Types, constants, etc.
    3) Library Components
    4) Styles

2) The TypeScript interface is organized in the following order:
    1) Required props, sorted A-Z
    2) Optional props, sorted A-Z
    3) A comment is placed above each prop in the interface. This comment is used to render the prop table in [Storybook](https://storybook.js.org/), and provide a meaningful description of the prop and its usage.
3) Defaults for optional props are declared in the function declaration for the component.
4) Whenever possible, break components down into sub-components, since this encourages re-usability and encapsulation further down the line. (use your best judgement). This is preferable to smaller render functions within a single component since it makes testing more straightforward.
5) Try your best to not abstract away standard expected functionality. For e.g., always return dispatched events to the user, and ensure that HTML APIs are as complete as possible. If you feel prop spreading is needed to shore up missing props for a native HTML element, that is ok, but do so with caution since this will circumvent prop validation.

#### Example

```jsx
import React from 'react';
import vendor from 'vendor';
import { Type } from './ComponentTypes';
import LibraryComponent from '../LibraryComponent/LibraryComponent';
import styles from './Component.module.scss';

interface ComponentProps {
  /**
   * Description of firstRequiredProp.
   */
  firstRequiredProp: ReactNode;
  /**
   * Description of secondRequiredProp.
   */
  secondRequiredProp: string;
  /**
   * Description of firstOptionalProp.
   */
  firstOptionalProp?: boolean;
  /**
   * Description of secondOptionalProp.
   */
  secondOptionalProp?: string;
}

const Component: FC<ComponentProps> = ({
  firstRequiredProp,
  secondRequiredProp,
  firstOptionalProp = false,
  secondOptionalProp = undefined;
}) => {
  
  return (
    ...
  );
};

export default Component;
```

### Styles

We use [CSS Modules](https://github.com/css-modules/css-modules) to import CSS, or [Sass](https://sass-lang.com/) into our components. Regardless of the the format imported, the extension for the file must always be `.sass`. 

All `class`s or `id`s should be written in kebab-case; [Stylelint](https://stylelint.io/) will throw an exception otherwise.

Styles are automatically vendor prefixed at build-time using the [Autoprefixer](https://github.com/postcss/autoprefixer) PostCSS plugin.

#### Example
```jsx
.component {
  composes: base from '../../styles/base.scss';

  .component-child {
    ...
  }
}
```

### Storybook Documentation

We use [Storybook](https://storybook.js.org/) to document components. Any new component, or addition to a component's API must have a corresponding story where it's showcased.

* Follow MDX format for writing stories. See [Button.stories.mdx](/src/components/Button/Button.stories.mdx) for a good example of this.

### Testing

We use [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) for all tests. We discourage the use of snapshot testing, instead opting to test desired functionality of a component. General guidelines:

* Do not test implementation details. For e.g., the name of a function changed (again, no snapshot testing).
* Try to write result-oriented tests. For e.g., when a change event happens, the onChange handler was properly invoked.
* Test whether components render correctly in their different states. As a rule-of-thumb, write a test to validate each state showcased in Storybook.

We use [Code Climate](https://codeclimate.com/) reports for test coverage. Our expectation for any new PR getting merged is that the new feature must satisfy at least 95% coverage. It will not get approved otherwise.

#### Example

```jsx
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Component from './Component';

describe('Component', () => {
  describe('Callback Handling', () => {
    describe('onClick', () => {
      test('it fires an onClick callback', () => {
        ...
      });

      ...
    });

    ...
  });

  describe('States', () => {
    describe('Default', () => {
      test('it renders the component in the default state', () => {
        render(
          <Component />
        );
        
        ...
      });
    });

    ...
  });
});
```

### Publishing

In order to ensure that a new component gets included in the library, it must be imported and included in the corresponding export of `src/components/index.js`.




## Submitting a Pull Request
[↥ back to top](#top)

* The ``master`` branch is the main branch, **and the one that you will open your PRs against**.
* Merging a PR to ``master`` will **not** result in a release. Releases are triggered by following the steps outlined in the [Releases](#releases) section below.
* Include **screenshots** or animated GIFs in your pull request whenever needed (if changes are visual in nature).
* It's OK, and even encouraged, to make multiple small commits as you work on a feature branch (commit early, and commit often) - we have configured GitHub to automatically squash commits before merging.
* **DO NOT** commit the ``dist`` folder, use it only for generating builds locally and testing on your end. In general, respect the [.gitignore](/.gitignore).
* If adding a new feature:
    * Provide a convincing reason to add this feature. Ideally you should open a suggestion issue first and have it green lighted before starting development.




## Releases
[↥ back to top](#top)

Palmetto Components uses the [semantic-release](https://github.com/semantic-release/semantic-release) npm package to fully automate the release workflow. Instead of manually updating the release version in `package.json`, and creating a new release tag in GitHub for each release, they are automatically triggered by prefixing the commit message when merging to `master`. Upon triggering a release, the package version is bumped depending on the type specified, a release tag is created in GitHub, and the new version is automatically published to [npm](https://www.npmjs.com/).

For e.g., opening a PR to master with the commit message `fix: Resolve bug`, will trigger a minor release and bump the package's version from `0.0.0` to `0.0.1`. Opening a PR with `feat(Table): Finalize tests` will trigger a feature release and bump the package's version from `0.0.0` to `0.1.0`.

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
