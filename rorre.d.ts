export type ReadOnly<T> = { readonly [P in keyof T]: T[P]; }
export type Stringify<T> = Extract<T, string>;

export interface Dictionary {
  [key: string]: string;
}

export interface RorreError<N extends string, M extends string> extends Error {
  name: N;
  message: M;
}

export interface Rorre<D extends Dictionary> {
  /**
   * Get the complete error dictionary indexed object.
   *
   * @description
   * This is an enumed mapping: for each error, both its #message
   * and generated #index exist as a key, and a value as well.
   */
  readonly dictionary: ReadOnly<D>;

  /**
   * Instanciate (but do NOT throw) a RorreError and return it.
   */
  readonly error: {
    readonly [N in keyof D]: RorreError<Stringify<N>, D[N]>;
  };

  /**
   * Get an enum of the dictionary errors' name.
   *
   * @description
   * This is a reverse mapping: for each error, both its #name
   * and generated #index exist as a key, and a value as well.
   */
  readonly name: {
    readonly [N in keyof D]: N;
  };
}

declare const rorre: {
  /**
   * Declare the complete errors dictionary.
   *
   * @description
   * This method can and must only be called once.
   */
  declare<D extends Dictionary>(dictionary: D): Rorre<D>;
};

export default rorre;
