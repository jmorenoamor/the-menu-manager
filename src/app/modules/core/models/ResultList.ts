/**
 * Django Rest Framework multiple objects result
 *
 * @interface ResultList<T>
 */
export interface ResultList<T> {
  count?: number,
  next?: string,
  previous?: string,
  results: T[];
}
