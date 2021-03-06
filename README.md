# Rorre

[![License][img-license]][link-license]
[![NPM Version][img-npm]][link-npm]
[![Build Status][img-travis]][link-travis]
[![Code Coverage][img-coveralls]][link-coveralls]

**Enumified, dictionary-based and dependenciless error library.**

## TOC

1. [Behaviors](#behaviors)
1. [Getting Started](#getting-started)
1. [Usage](#usage)
1. [Localization](#localization)
1. [Compatibility](#compatibility)
1. [Best Practices](#best-practices)
1. [API](#usage)
1. [Contribute](#contribute)

## Behaviors

- As a developer:
  - I want the error library to be [frozen][link-mdn-freeze].
  - I want an error dictionary.
  - I want the error dictionary to be declared only once.
  - I want the error dictionary to be frozen.
  - I want my errors to have a unique **name**.
  - I want my errors to have a mandatory **message**.
  - I want the error names to be enumable.
  - I want to get trackable error codes (_= name_) from my end-users.

## Getting Started

```
npm i rorre
```

### Typescript & Flow

The Typescript and Flow definitions are included in this library.

## Usage

Declare your errors in a single file (called `errors.js` here):

```js
const rorre = require("rorre");

module.exports = rorre.declare({
  ERR_ONE: `First error message.`,
  ERR_TWO: `Second error message.`
});
```

Throw them via their name:

```js
const errors = require("./errors");

if (somethingWentWrong()) throw errors.error.ERR_ONE;
```

And that's all !

This will return an instance of `RorreError`, itself inherited from `Error`. Each error will get a
`name` and a `message` matching the ones in the dictionary. In the case above, a
`throw errors.error.ERR_ONE` would output:

```bash
ERR_ONE: First error message.
    at Object._ERROR.(anonymous function) [as ERR_ONE] .../node_modules/rorre/rorre.js:105:28)
    at Object.<anonymous> (.../index.js:3:20)
    at Module._compile (internal/modules/cjs/loader.js:688:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:699:10)
    at Module.load (internal/modules/cjs/loader.js:598:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:537:12)
    at Function.Module._load (internal/modules/cjs/loader.js:529:3)
    at Function.Module.runMain (internal/modules/cjs/loader.js:741:12)
    at startup (internal/bootstrap/node.js:285:19)
    at bootstrapNodeJSCore (internal/bootstrap/node.js:739:3)
```

You obviously need to **ignore the first Error Stack line** since `new RorreError()` is called
within Rorre library.

### Typescript & Flow

In Typescript and Flow, you will benefit from the autocompletion thanks to the types inference
patterns included in the typings declaration. It's advisable not to try custom-typing your Error
Dictionary to avoid interfering with the inference process.

## Localization

If you wish to use this library to also handle end-users errors and integrate your translations in
the process, you can take advantage of the `rorre.name` enum. Your code could look like this:

```js
const errors = require("./errors");
const locales = requires("../i18n/en.json");

if (somethingWentWrong()) showErrorWithMessage(locales[errors.name.ERR_ONE]);
```

Since there are many existing formats and conventions to handle localization, rorre does not
implement anything specific regarding that. It's up to you to re-declare your error dictionary names
within your localization files.

## Compatibility

This CommonJS library is written and distributed in ES6. You may use a transpiler (i.e.:
[Babel](https://babeljs.io/)) in order to make it ES5-compatible.

### Node

| Version |        Raw         | Transpiled |
| ------: | :----------------: | :--------: |
|      11 | :white_check_mark: | :question: |
|      10 | :white_check_mark: | :question: |
|       8 | :white_check_mark: | :question: |
|       6 |        :x:         | :question: |
|       4 |        :x:         | :question: |
|    0.12 |        :x:         | :question: |
|    0.10 |        :x:         | :question: |

### Browser

_In progress..._

## Best Practices

- Error names SHOULD be in **SCREAMING_SNAKE_CASE**.<br> _**Why ?** Because an error name is
  supposed to be easy to find, irrespective of the size of the codebase. In Javascript, most
  variable names are in camel-case. Therefore it's easier to run a case-sensitive search to look for
  the error name. Moreover it also catches the eye when lost in the middle of a log history._
- Error messages SHOULD start with an **Uppercase** letter AND SHOULD end with a **dot**.<br> _**Why
  ?** Because an error message is supposed to be a humanely understandable message. We are used to
  read sentences starting with an uppercase letter and ending with a punctuation mark. Therefore it
  improves the readability._

## API

### Rorre Class

#### `Rorre#declare(dictionary: Dictionary): Rorre`

Return an frozen instance of Rorre.

The `<dictionary>` parameter must be a pure `object` made of Error names as its properties, and
matching Error messages as its values. Both its properties and values are expected to be a `string`.

#### `Rorre#dictionary: Dictionary`

Getter for the Error Dictionary your declared with `Rorre#declare()`. All of its properties are
`read-only`.

#### `Rorre#error: { [keyof Dictionary]: () => RorreError }`

Getter for the Error Dictionary your declared with `Rorre#declare()` returning .

#### `Rorre#name: { [keyof Dictionary]: keyof Dictionary }`

Getter for the Error Dictionary names _(= its property names)_ in a simple enum form. It allows you
to check the errors by their name in case you wish to compare them. All of its properties are
`read-only`. This can be useful for testing purposes.

Example:

```js
const rorre = require('rorre')

const errors = rorre.declare({
  ERR_FOO_VALIDATION_ASTRING_TYPE: `The <aString> param in foo() must be a string.`,
})

foo(aString) {
  if (typeof aString !== 'string') {
    throw errors.error.ERR_FOO_VALIDATION_ASTRING_TYPE
  }
}

describe('foo()', () => {
  it('should throw the expected error when <aString> is not a string', () => {
    let testErr
    try { foo(123) }
    catch(err) { testErr = err }
    assert.strictEqual(err.name, errors.name.ERR_FOO_VALIDATION_ASTRING_TYPE))
  })
})
```

### RorreError Class

**Note: The RorreError class is not exported and only described here for documentation sake.**

This class is an extension of `Error` with a mandatory `name` property. Both its `message` and
`name` properties are expected to be a `string`.

## Contribute

```
git clone https://github.com/ivangabriele/rorre.git
cd rorre
npm install
```

### Test

- All Tests: `npm test`
- Lint Tests: `npm run test:lint`
- Unit Tests: `npm run test:unit`
- Unit Tests (watch): `npm run test:watch`

---

[img-coveralls]: https://img.shields.io/coveralls/github/ivangabriele/rorre/master?style=flat-square
[img-license]: https://img.shields.io/badge/License-MIT-blue?style=flat-square
[img-npm]: https://img.shields.io/npm/v/rorre?style=flat-square
[img-travis]: https://img.shields.io/travis/com/ivangabriele/rorre/master?style=flat-square
[link-coveralls]: https://coveralls.io/github/ivangabriele/rorre
[link-license]: https://github.com/ivangabriele/rorre/blob/master/LICENSE
[link-mdn-freeze]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
[link-npm]: https://www.npmjs.com/package/rorre
[link-travis]: https://travis-ci.com/ivangabriele/rorre
