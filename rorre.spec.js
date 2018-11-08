
const assert = require('assert')

const rorre = require('.')

const DICTIONARY = {
  ERROR_ONE: `First error.`,
  ERROR_TWO: `Second error.`,
}
const DICTIONARY_EXPECTED = {
  0: `First error.`,
  1: `Second error.`,
  ...DICTIONARY,
}

function assertError(fn, message) {
  let err
  try { fn() }
  catch(e) { err = e }

  assert.strictEqual(err.message, message)
}

describe('Rorre', () => {
  it('should be sealed', () => assert.strictEqual(Object.isSealed(rorre), true))
  it('should be final', () => assert.strictEqual(Object.isExtensible(rorre), false))

  describe('#dictionary', () => {
    it(`should throw the expected error when the dictionary has not been declared`, () =>
      assertError(
        () => rorre.dictionary,
        `Rorre#dictionary: You need to declare your dictionary first, in order to call this getter.`
      ))
  })

  describe('#declare()', () => {
    it(`should throw the expected error when the dictionary is an empty object`, () =>
      assertError(
        () => rorre.declare({}),
        `Rorre#declare(): Your <dictionary> can't be empty.`
      ))

    it(`shouldn't throw any error with a valid dictionary`, () =>
      assert.doesNotThrow(() => rorre.declare(DICTIONARY)))

    it(`should throw the expected error when re-called`, () =>
      assertError(
        () => rorre.declare({ ERROR_NEVER: `Impossible error.` }),
        `Rorre#declare(): You already declared an error dictionary.`
      ))
  })

  describe('#dictionary', () => {
    it(`should match the declared dictionary`, () => assert.deepStrictEqual(rorre.dictionary, DICTIONARY_EXPECTED))
  })

  describe('#emit()', () => {
    const DICTIONARY_KEY = 'ERROR_ONE'
    let dictionaryError

    it(`shouldn't throw any error with a valid enum`, () =>
      assert.doesNotThrow(() => rorre.emit(rorre.name[DICTIONARY_KEY])))
    it(`shouldn't throw any error with a valid index`, () => assert.doesNotThrow(() => rorre.emit(0)))
    it(`shouldn't throw any error with a valid name`, () => assert.doesNotThrow(() => rorre.emit('ERROR_ONE')))

    it(`should return an instance of RorreError`, () => {
      dictionaryError = rorre.emit(rorre.name.ERROR_ONE)
      assert.strictEqual(dictionaryError.constructor.name, 'RorreError')
    })
    it(`└ which should be extended from Error`, () => assert.strictEqual(dictionaryError instanceof Error, true))

    it(`should emit the expected RorreError#index`, () => assert.strictEqual(dictionaryError.index, 0))
    it(`should emit the expected RorreError#name`, () => assert.strictEqual(dictionaryError.name, DICTIONARY_KEY))
    it(`should emit the expected RorreError#message`, () =>
      assert.strictEqual(dictionaryError.message, DICTIONARY[DICTIONARY_KEY]))
  })
})
