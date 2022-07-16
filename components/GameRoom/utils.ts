export function getBlockId(x: number, y: number) {
  return `cell${x < 10 ? "0" + x : x}${y < 10 ? "0" + y : y}`;
}
