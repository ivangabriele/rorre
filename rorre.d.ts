type ReadOnly<T> = {
  readonly [P in keyof T]: T[P];
}
type Stringify<T> = Extract<T, string>

export interface Dictionary {
  [name: string]: string;
}

export interface RorreError<T extends Dictionary, P extends string> extends Error {
  index: number;
  name: P;
  message: T[P];
}

interface Rorre<T extends Dictionary = {}> {
  /**
   * Get the complete error dictionary indexed object.
   *
   * @description
   * This is an enumed mapping: for each error, both its #message
   * and generated #index exist as a key, and a value as well.
   */
  dictionary: ReadOnly<T>;

  /**
   * Get an enum of the dictionary errors' name.
   *
   * @description
   * This is a reverse mapping: for each error, both its #name
   * and generated #index exist as a key, and a value as well.
   */
  error: ReadOnly<{
    readonly [P in keyof T]: () => ReadOnly<RorreError<T, Stringify<P>>>;
  }>;

  /**
   * Get an enum of the dictionary errors' name.
   *
   * @description
   * This is a reverse mapping: for each error, both its #name
   * and generated #index exist as a key, and a value as well.
   */
  name: ReadOnly<{
    readonly [P in keyof T]: number;
  }>;

  /**
   * Declare the complete errors dictionary.
   *
   * @description
   * This method can and must only be called once.
   */
  declare<T extends Dictionary>(dictionary: T): Rorre<T>;

  /**
   * Instanciate (but do NOT throw) a RorreError and return it.
   */
  emit<T extends Dictionary>(name: keyof T | number): RorreError<T, Stringify<keyof T>>;
}

declare const rorre: ReadOnly<Rorre>;
export default rorre;
