<p align="center">
  <a href="https://palmetto.com" rel="noopener" target="_blank"><img width="150" src="https://app.palmetto.com/static/media/logo.4d85ce48.svg" alt="Palmetto logo"></a></p>
</p>

<h1 align="center" style="border-bottom: none;">Palmetto Component Library</h1>
<h3 align="center">

  A [React](https://reactjs.org/) component library to power all Palmetto UI

</h3>

<div align="center" style="margin-top: 25px">

  [![Publish To NPM](https://github.com/palmetto/palmetto-components/workflows/Publish%20To%20NPM/badge.svg)](https://github.com/palmetto/palmetto-components/actions?query=workflow%3A%22Publish+To+NPM%22)
  [![Chromatic](https://github.com/palmetto/palmetto-components/workflows/Chromatic/badge.svg?branch=main)](https://github.com/palmetto/palmetto-components/actions?query=workflow%3AChromatic)
  [![Test Coverage](https://api.codeclimate.com/v1/badges/e61e897623b87d91d155/test_coverage)](https://codeclimate.com/github/palmetto/palmetto-components/test_coverage)

</div>

## Quick Start

### 1. Install

`yarn add @palmetto/palmetto-components`

### 2. Import Global CSS

```jsx
@import '@palmetto/palmetto-components/dist/css/utilities.css'; // Utility classes -- REQUIRED
@import '@palmetto/palmetto-components/dist/css/variables.css'; // CSS Variables -- REQUIRED
@import '@palmetto/palmetto-components/dist/css/index.css'; // Component CSS -- REQUIRED
@import '@palmetto/palmetto-components/dist/css/fonts.css'; // Included Font files -- OPTIONAL BUT ENCOURAGED
```

We recommend importing our global reset in order to maintain a consistent
look of all components across applications.

```jsx
@import '@palmetto/palmetto-components/dist/css/reset.css' // A Basic CSS Reset -- OPTIONAL BUT ENCOURAGED.
```

### 3. Usage

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@palmetto/palmetto-components';

function App() {
  return <Button>Hello World</Button>;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

## Documentation

[SEE FULL DOCS HERE](https://ux.palmetto.com)

## Contributing

Issues and PRs welcome! See [HERE](https://github.com/palmetto/palmetto-components/blob/main/docs/CONTRIBUTING.md) for our Contribution Guide.

## Raising an Issue

When raising an issue:
* Make sure the issue hasn't been raised yet.
* Tag issue accordingly using your best judgement. Do NOT create new tags. If you feel a new one is needed, raise it in your issue.
* If your issue is a bug, include **screenshots** or animated GIFs in your issue whenever needed (if issue is visual in nature).
* If your issue is a bug, include steps to reproduce, or link to reproducible issue, e.g.: Code Sandbox or similar. Please also provide any additional details including device, OS, browser, browser version etc.

[Issues can be raised here](https://github.com/palmetto/palmetto-components/issues).

## License

This project is licensed under the terms of the
[MIT license](/LICENSE).
