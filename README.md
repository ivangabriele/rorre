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
  - I want to ensure the error library is [frozen](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze).
  - I want an error dictionary _(i.e.: `{ ERR_WRONG: '', ... }`)_.
  - I want to ensure the error dictionary is only declared once.
  - I want to ensure the error dictionary is frozen.
  - I want to ensure my errors to have a unique **name** _(i.e.: `ERR_`)_.
  - I want to ensure my errors to have a mandatory **message**.
  - I want the error names to be enumable _(in order to call an error via its name)_.
  - I want to get trackable error codes (_= name_) from my end-users.

## Getting Started

```
npm i rorre
```

> **Typescript**<br>
> The typings declaration is included.

## Usage

Declare your errors in a single file:

```js
import rorre from 'rorre'

rorre.declare({
  ERR_ONE: 'Error one.',
  ERR_TWO: 'Error two.',
  ...
})
```

Throw them via their name:

```js
import rorre from 'rorre'

if (somethingWentWrong()) throw rorre.emit(rorre.name.ERR_ONE)
```

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
