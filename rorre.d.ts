type ValueOf<T> = T[keyof T]

export interface Dictionary {
  [name: string]: string
}

export interface RorreError<T> extends Error {
  index: number
  name: keyof T
  message: ValueOf<T>
}

export interface RorreDictionary<T> {
  [index: number]: RorreError<T>[message]
  [name: keyof T]: RorreError<T>[message]
}
export interface RorreName<T> {
  [index: number]: RorreError<T>[name]
  [name: keyof T]: RorreError<T>[name]
}

declare interface Rorre<T> {
  /**
   * Get the complete error dictionary indexed object.
   *
   * @description
   * This is an enumed mapping: for each error, both its #message
   * and generated #index exist as a key, and a value as well.
   */
  dictionary: RorreDictionary<T>

  /**
   * Get an enum of the dictionary errors' name.
   *
   * @description
   * This is a reverse mapping: for each error, both its #name
   * and generated #index exist as a key, and a value as well.
   */
  name: RorreName<T>

  /**
   * Declare the complete errors dictionary.
   *
   * @description
   * This method can and must only be called once.
   */
  declare(dictionary: Dictionary): void

  /**
   * Instanciate (but do NOT throw) a RorreError and return it.
   */
  emit(code: keyof T | number): RorreError<T>
}
