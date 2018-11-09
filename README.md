# Rorre

[![The MIT License](https://img.shields.io/badge/license-MIT-orange.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![npm](https://img.shields.io/npm/v/rorre.svg?style=flat-square)](https://www.npmjs.com/package/rorre)
[![Travis](https://img.shields.io/travis/ivangabriele/rorre.svg?style=flat-square)](https://travis-ci.org/ivangabriele/rorre)
[![David](https://img.shields.io/david/ivangabriele/rorre.svg?style=flat-square)](https://david-dm.org/ivangabriele/rorre?type=dev)
[![David](https://img.shields.io/david/dev/ivangabriele/rorre.svg?style=flat-square)](https://david-dm.org/ivangabriele/rorre?type=dev)

## TOC

1. [Behaviors](#behaviors)
1. [Getting Started](#getting-started)
1. [Usage](#usage)
1. [Compatibility](#compatibility)
1. [Best Practices](#best-practices)
1. [Contribute](#contribute)

## Behaviors

- As a developer:
  - I want the error library to be [frozen](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze).
  - I want an Error Dictionary _(i.e.: `{ ERR_ONE: 'First error message', ... }`)_.
  - I want the error dictionary to be declared only once.
  - I want the error dictionary to be frozen.
  - I want my errors to have a unique **name** _(i.e.: `ERR_`)_.
  - I want my errors to have a mandatory **message**.
  - I want the error names to be enumable.<br>
    _In order to generate an error via its name as a property._
  - I want to get trackable error codes (_= name_) from my end-users.

## Getting Started

```
npm i rorre
```

> **Typescript**<br>
> The typings declaration is included.

## Usage

Declare your errors in a single file (called `errors.js` here):

```js
import rorre from 'rorre'

export default rorre.declare({
  ERR_ONE: `First error message.`,
  ERR_TWO: `Second error message.`,
  ...
})
```

Throw them via their name:

```js
import errors from './errors'

if (somethingWentWrong()) throw errors.error.ERR_ONE
```

And that's all !

This will return an instance of `RorreError`, itself inherited from `Error`. Each error will get a `name` and a `message` matching the ones in the dictionary. In the case above, a `trhow errors.error.ERR_ONE` would output:

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

You obviously need to **ignore the first Error Stack line** since `new RorreError()` is called within Rorre library.

> **Typescript**<br>
> In Typescript you will benefit from the autocompletion thanks to the types inference patterns included in the typings declaration. It's advisable not to try typing your Error Dictionary yourself in order to avoid interfering with the inference process.

## Compatibility

This library is written in ES6 and is fully transpilable to ES5 if you use a transpiler in your project.

### Without a transpiler

_In progress..._

### With an es5 transpiler

_In progress..._

## Good Practices

_In progress..._

## Contribute

```
git clone https://github.com/ivangabriele/rorre.git
cd rorre
npm install
```
