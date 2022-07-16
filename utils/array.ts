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

export function arrayRandomElement<T>(array: T[]) {
  const rndIndex = Math.round(Math.random() * array.length);
  return array[rndIndex];
}
