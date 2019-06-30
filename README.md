[![CircleCI](https://circleci.com/gh/code-openness/sparql-visualizer/tree/master.svg?style=svg)](https://circleci.com/gh/code-openness/sparql-visualizer/tree/master)

[![node-v10.5.3](https://img.shields.io/badge/node-v10.5.3-blue.svg)](https://nodejs.org/en/)
[![yarn-v1.5.12](https://img.shields.io/badge/yarn-v1.5.12-orange.svg)](https://yarnpkg.com/en/docs/getting-started)

# SPARQL visualizer

A typescript library to simplify visualization of SPARQL queries.

## Usage

1. Write all your visualization elements down in the html file using the shape below.

    ```html
    <div data-visualization="__VISUALIZATION-TYPE__">
        <script type="text/plain" data-content="Query">
            __SPARQL-QUERY__
        </script>
    </div>
    ```

    - `__SPARQL-QUERY__` = A valid sparql query, validate your queries [here](https://query.wikidata.org).
    - `__VISUALIZATION-TYPE__` = Type of the graphic or tabular visualization (e.g. `'BubbleChart'`)

2. Include the `sparql-visualizer.js` at the end of your body.

    ```html
    <script src="PATH_TO_THE_SPARQL_VISUALIZER_JS_FILE" type="text/javascript"></script>
    <script>
        // Use the library here below the import
    </script>
    ```

3. Construct a serializer object, configure it as you like and call `serialize`.

    ```js
    const { Serializer } = SparqlVisualizer;
    const serializer = new Serializer();

    // bellow is an example with the standard endpoint configuration
    serializer.withEndpoint({ httpProtocol: 'https', host: 'wikidata.org' });

    await serializer.serialize();
    ```

    **or in one go**

    ```js
    const { Serializer } = SparqlVisualizer;

    await new Serializer()
        .withEndpoint({
            httpProtocol: 'https',
            host: 'wikidata.org'
        })
        .serialize();
    ```

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

The [sinon](https://sinonjs.org/) library is used to mock, stub, spy and fake
withing tests to make our lives easier.

## Deploy

Run `yarn build` to generate the final Javascript file in the `dist/` folder
and import it in your Javascript, Typescript project or through a `<script>` tag
in your static HTML. After that you can use the global `SparqlVisualizer` object
to access the Serializer class.
