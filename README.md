# Palmetto Components
A React component library to power all Palmetto UI.

## Available Scripts

In the project directory, you can run:

### `yarn storybook`

Launches a local storybook instance to test components in a sandbox.<br />
Open [http://localhost:9009](http://localhost:9009) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test` `yarn test:watch`

Launch the test runner in standard or the interactive watch mode respectively<br />

### `yarn build`

Builds the library for release to the `dist` folder.<br />

### `yarn build-storybook`

Builds the storybook instance into static files for deployment/hosting to the `storybook-static` folder. NOTE: This one likely never needs to be run locally.<br />

## `local development`
This library is meant to be added as a dependency to React apps. Aside from sandbox testing in storybook, you can also test any changes or new features by following these steps:

Build locally by running `yarn build`

In order to test any local changes you'll need to build the library, and symlink your local package into any project that consumes it. See [NPM link](https://docs.npmjs.com/cli/link) or [Yarn link](https://classic.yarnpkg.com/en/docs/cli/link/) for more details.

## `usage`
Refer to the storybook for available components.
In your project: `yarn add @palmetto/palmetto-components`

In a react components: `import { TextInput } from '@palmetto/palmetto-components'`
