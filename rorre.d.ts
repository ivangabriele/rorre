export interface Dictionary {
  [name: string]: string
}

export interface RorreError extends Error {
  index: number
  name: string
  message: string
}

declare interface Rorre {
  /**
   * Get the complete error dictionary indexed object.
   *
   * @description
   * This is an enumed mapping: for each error, both its #message
   * and generated #index exist as a key, and a value as well.
   */
  dictionary: Dictionary

  /**
   * Get an enum of the dictionary errors' name.
   *
   * @description
   * This is a reverse mapping: for each error, both its #name
   * and generated #index exist as a key, and a value as well.
   */
  name: string | number

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
  emit(name: number | string): RorreError
}

export default Rorre
