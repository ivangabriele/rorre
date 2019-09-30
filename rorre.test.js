/* eslint-disable no-return-assign */

const rorre = require(".");

const DICTIONARY = {
  ERR_ONE: `First error message.`,
  ERR_TWO: `Second error message.`
};

function assertError(fn, message) {
  let err;
  try {
    fn();
  } catch (e) {
    err = e;
  }

  expect(err.message).toStrictEqual(message);
}

describe("Rorre", () => {
  let errorDictionary;

  it("should be sealed", () => expect(Object.isSealed(rorre)).toStrictEqual(true));
  it("should be final", () => expect(Object.isExtensible(rorre)).toStrictEqual(false));

  describe("#declare()", () => {
    it(`should throw the expected error when the dictionary is an empty object`, () =>
      assertError(() => rorre.declare({}), `Rorre#declare(): Your <dictionary> can't be empty.`));

    it(`shouldn't throw any error with a valid dictionary`, () =>
      expect(() => (errorDictionary = rorre.declare(DICTIONARY))).not.toThrow());

    it(`should return the same dictionary when re-called with a different one`, () => {
      errorDictionary = rorre.declare({ ERROR_NEVER: `Impossible error.` });
      expect(errorDictionary.dictionary).toEqual(DICTIONARY);
    });
  });

  describe("#dictionary", () => {
    it(`should be frozen`, () =>
      expect(Object.isFrozen(errorDictionary.dictionary)).toStrictEqual(true));

    it(`should match the declared dictionary`, () =>
      expect(errorDictionary.dictionary).toEqual(DICTIONARY));
  });

  describe("#error", () => {
    it(`should be frozen`, () =>
      expect(Object.isFrozen(errorDictionary.error)).toStrictEqual(true));

    describe("#ERR_ONE()", () => {
      it(`should return an instance of RorreError`, () =>
        expect(errorDictionary.error.ERR_ONE.constructor.name).toStrictEqual("RorreError"));
      it(`└ which should be extended from Error`, () =>
        expect(errorDictionary.error.ERR_ONE instanceof Error).toStrictEqual(true));

      it(`should emit the expected RorreError#name`, () =>
        expect(errorDictionary.error.ERR_ONE.name).toStrictEqual("ERR_ONE"));
      it(`should emit the expected RorreError#message`, () =>
        expect(errorDictionary.error.ERR_ONE.message).toStrictEqual(DICTIONARY.ERR_ONE));
    });

    describe("#ERR_TWO()", () => {
      it(`should return an instance of RorreError`, () =>
        expect(errorDictionary.error.ERR_TWO.constructor.name).toStrictEqual("RorreError"));
      it(`└ which should be extended from Error`, () =>
        expect(errorDictionary.error.ERR_TWO instanceof Error).toStrictEqual(true));

      it(`should emit the expected RorreError#name`, () =>
        expect(errorDictionary.error.ERR_TWO.name).toStrictEqual("ERR_TWO"));
      it(`should emit the expected RorreError#message`, () =>
        expect(errorDictionary.error.ERR_TWO.message).toStrictEqual(DICTIONARY.ERR_TWO));
    });
  });

  describe("#name", () => {
    it(`should be frozen`, () => expect(Object.isFrozen(errorDictionary.name)).toStrictEqual(true));

    describe("#ERR_ONE()", () => {
      it(`should be frozen`, () =>
        expect(Object.isFrozen(errorDictionary.name.ERR_ONE)).toStrictEqual(true));
      it(`should be a named enum`, () =>
        expect(errorDictionary.name.ERR_ONE).toStrictEqual("ERR_ONE"));
    });

    describe("#ERR_TWO()", () => {
      it(`should be frozen`, () =>
        expect(Object.isFrozen(errorDictionary.name.ERR_TWO)).toStrictEqual(true));
      it(`should be a named enum`, () =>
        expect(errorDictionary.name.ERR_TWO).toStrictEqual("ERR_TWO"));
    });
  });
});
