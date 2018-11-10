
const assert = require('assert')

const rorre = require('..')

const DICTIONARY = {
  ERR_ONE: `First error message.`,
  ERR_TWO: `Second error message.`,
}

function assertError(fn, message) {
  let err
  try { fn() }
  catch(e) { err = e }

  assert.strictEqual(err.message, message)
}

describe('Rorre', () => {
  let errorDictionary

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
      assert.doesNotThrow(() => errorDictionary = rorre.declare(DICTIONARY)))

    it(`should throw the expected error when re-called`, () =>
      assertError(
        () => errorDictionary.declare({ ERROR_NEVER: `Impossible error.` }),
        `Rorre#declare(): You already declared an error dictionary.`
      ))
  })

  describe('#dictionary', () => {
    it(`should be frozen`, () => assert.strictEqual(Object.isFrozen(errorDictionary.dictionary), true))

    it(`should match the declared dictionary`, () =>
      assert.deepStrictEqual(errorDictionary.dictionary, DICTIONARY))
  })

  describe('#error', () => {
    it(`should be frozen`, () => assert.strictEqual(Object.isFrozen(errorDictionary.error), true))

    describe('#ERR_ONE()', () => {
      it(`should return an instance of RorreError`, () =>
        assert.strictEqual(errorDictionary.error.ERR_ONE().constructor.name, 'RorreError'))
      it(`└ which should be extended from Error`, () =>
        assert.strictEqual(errorDictionary.error.ERR_ONE() instanceof Error, true))

      it(`should emit the expected RorreError#name`, () =>
        assert.strictEqual(errorDictionary.error.ERR_ONE().name, 'ERR_ONE'))
      it(`should emit the expected RorreError#message`, () =>
        assert.strictEqual(errorDictionary.error.ERR_ONE().message, DICTIONARY.ERR_ONE))
    })

    describe('#ERR_TWO()', () => {
      it(`should return an instance of RorreError`, () =>
        assert.strictEqual(errorDictionary.error.ERR_TWO().constructor.name, 'RorreError'))
      it(`└ which should be extended from Error`, () =>
        assert.strictEqual(errorDictionary.error.ERR_TWO() instanceof Error, true))

      it(`should emit the expected RorreError#name`, () =>
        assert.strictEqual(errorDictionary.error.ERR_TWO().name, 'ERR_TWO'))
      it(`should emit the expected RorreError#message`, () =>
        assert.strictEqual(errorDictionary.error.ERR_TWO().message, DICTIONARY.ERR_TWO))
    })
  })

  describe('#name', () => {
    it(`should be frozen`, () => assert.strictEqual(Object.isFrozen(errorDictionary.name), true))

    describe('#ERR_ONE()', () => {
      it(`should be frozen`, () => assert.strictEqual(Object.isFrozen(errorDictionary.name.ERR_ONE), true))
      it(`should be a named enum`, () => assert.strictEqual(errorDictionary.name.ERR_ONE, 'ERR_ONE'))
    })

    describe('#ERR_TWO()', () => {
      it(`should be frozen`, () => assert.strictEqual(Object.isFrozen(errorDictionary.name.ERR_TWO), true))
      it(`should be a named enum`, () => assert.strictEqual(errorDictionary.name.ERR_TWO, 'ERR_TWO'))
    })
  })
})