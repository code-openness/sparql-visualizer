![[CircleCI](https://circleci.com/gh/code-openness/sparql-visualizer/tree/master.svg?style=svg)](https://circleci.com/gh/code-openness/sparql-visualizer/tree/master)

[![node-v10.5.3](https://img.shields.io/badge/node-v10.5.3-blue.svg)](https://nodejs.org/en/)
[![yarn-v1.5.12](https://img.shields.io/badge/yarn-v1.5.12-orange.svg)](https://yarnpkg.com/en/docs/getting-started)

# SPARQL visualizer

A typescript library to simplify visualization of SPARQL queries.

## Setup

In order to take part in the development you need to setup the following tools.

### Node

You can install [nvm](https://github.com/nvm-sh/nvm) and run this command at the root of the project structure to use the required version of node

```sh
nvm install
nvm use
```

**_or_**

You install the node version manually, that specified in the `.nvmrc` file, that can
also be found at the top of this readme file, from the [official site](https://nodejs.org/en/).

### Yarn

Package management is done with [yarn](https://yarnpkg.com/lang/en/), for consistency use the version
from the badge specified at the top of the readme file or higher.

### Install all dependencies

**_Note_**: Always make sure to use the specified version of node before
developing or installing all dependencies, they are node version specific **!!!**

To download and install all dependencies to the `node_modules` folder run

```sh
yarn
```

## Development

### Scripts

You can use the following scripts to develop, test, lint, format, deploy (, ...)
the project.

```sh
yarn analyze   # starts webpack and the webpack-bundle-analyzer
yarn build     # transpiles the source code into the dist/ folder
yarn clean     # removes the dist/ and coverage/ folders
yarn lint      # lints all files
yarn prettier  # runs prettier to autoformat the code
yarn start     # start the webpack development server on port 8080
yarn test      # run jest to check all test suites (*.spec.ts)
```

### Testing

Testing is performed with [Jest](https://jestjs.io/). Checkout their documentation and look at
existing test suites (all files with suffix `.spec.ts`) to get you started.

## Deploy

Run `yarn build` to generate the final Javascript file in the `dist/` folder
and import it in your Javascript, Typescript project or thourgh a `<script>` tag
in your static HTML.
