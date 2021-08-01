export function sumToConsole(...args: number[]): typeof sumToConsole {
  const sum = args.reduce((sum, i) => (sum += i), 0);
  console.log(sum);

  return sumToConsole.bind(null, ...args);
}
