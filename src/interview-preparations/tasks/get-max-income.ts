export function getMaximumIncome(input: number[]): number {
  let account = 0;
  let items = 0;

  /**
   * We should buy if there would be price more than current.
   * We should sell if there won't be the bigger price or it's the last price.
   */
  for (let i = 0; i < input.length; i++) {
    const todayPrice = input[i];
    const lastDay = i === input.length - 1;
    const shouldBuy =
      !lastDay &&
      input.slice(i + 1).find((nextPrice) => todayPrice < nextPrice);

    if (shouldBuy) {
      items += 1;
      account -= todayPrice;
    } else {
      account += todayPrice * items;
      items = 0;
    }
  }

  return account;
}
