export function uniquePredicate<T>(
  element: T,
  index: number,
  array: T[],
  isEqual?: (a: T, b: T) => boolean
) {
  return (
    array.findIndex((e) => (isEqual ? isEqual(element, e) : element === e)) ===
    index
  );
}
