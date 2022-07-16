export function className(...args: (string | boolean | null | undefined)[]) {
  return args.filter((arg) => arg).join(" ");
}
