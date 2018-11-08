let _NAME
let _DICTIONARY

/**
 * RorreError customizes the default Error:
 * - make #name property compulsory (nonexistent in Node and only optional in a browser),
 * - add an #index property in order to generate error indexes within Rorre dictionary.
 */
class RorreError extends Error {
  constructor(message, name, index) {
    switch (true) {
      case typeof message !== 'string' || message.length === 0:
        throw new Error(`RorreError(): The <message> must be a non-empty string.`)

      case typeof name !== 'string' || name.length === 0:
        throw new Error(`RorreError(): The <name> must be a non-empty string.`)

      case typeof index !== 'number' || index < 0 || Math.floor(index) !== index:
        throw new Error(`RorreError(): The <index> must be a non-negative integer.`)
    }

    super(message)

    this.name = name
    this.index = index
  }
}

class Rorre {
  /**
   * Get the complete error dictionary indexed object.
   *
   * @description
   * This is an enumed mapping: for each error, both its #message
   * and generated #index exist as a key, and a value as well.
   */
  get dictionary() {
    if (_DICTIONARY === undefined) {
      throw new Error(`Rorre#dictionary: You need to declare your dictionary first, in order to call this getter.`)
    }

    return _DICTIONARY
  }

  /**
   * Get an enum of the dictionary errors' name.
   *
   * @description
   * This is a reverse mapping: for each error, both its #name
   * and generated #index exist as a key, and a value as well.
   */
  get name() {
    if (_NAME === undefined) {
      throw new Error(`Rorre#code: You need to declare your dictionary first, in order to call this getter.`)
    }

    return _NAME
  }

  /**
   * Declare the complete errors dictionary.
   *
   * @description
   * This method can and must only be called once.
   */
  declare(dictionary) {
    switch (true) {
      case _DICTIONARY !== undefined:
        throw new Error(`Rorre#declare(): You already declared an error dictionary.`)

      case Object.prototype.toString.call(dictionary) !== '[object Object]':
        throw new Error(`Rorre#declare(): Your <dictionary> must be a pure object: { ... }.`)

      case Object.entries(dictionary).length === 0:
        throw new Error(`Rorre#declare(): Your <dictionary> can't be empty.`)

      case Object.entries(dictionary).filter(([_, m]) => typeof m !== 'string' || m.length === 0).length !== 0:
        throw new Error(`Rorre#declare(): Your <dictionary> values (= messages) must be non-empty strings.`)
    }

    _NAME = {}
    _DICTIONARY = {}

    let index = -1
    for (let name in dictionary) {
      // _NAME is an enum:
      _NAME[_NAME[name] = ++index] = name
      // _DICTIONARY is indexed via this enum:
      _DICTIONARY[name] = _DICTIONARY[index] = dictionary[name]
    }

    _NAME = Object.freeze(_NAME)
    _DICTIONARY = Object.freeze(_DICTIONARY)
  }

  /**
   * Instanciate (but do NOT throw) a RorreError and return it.
   */
  emit(errorIndexOrName) {
    switch (true) {
      case _DICTIONARY === undefined:
        throw new Error(`Rorre#emit(): You need to declare your dictionary first, in order to call this method.`)

      case typeof _DICTIONARY[errorIndexOrName] !== 'string':
        throw new Error(`Rorre#emit(): This dictionary key ("${errorIndexOrName}") does not exist.`)
    }

    let errorIndex, errorName
    if (typeof errorIndexOrName === 'number') {
      errorIndex = errorIndexOrName
      errorName = _NAME[errorIndexOrName]
    } else {
      errorIndex = _NAME[errorIndexOrName]
      errorName = errorIndexOrName
    }

    return new RorreError(_DICTIONARY[errorIndex], errorName, errorIndex)
  }
}

module.exports = Object.seal(new Rorre())

// Enable Typescript default export
module.exports.default = module.exports