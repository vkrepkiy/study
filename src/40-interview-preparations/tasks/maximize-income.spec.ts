describe(`\
Верните максимальную прибыль от котировок акций. Котировки акций хранятся в массиве по дате. \
Прибыль от акций – разница в ценах на покупку и продажу акций. Каждый день вы можете купить \
1 акцию и продать любое количество акций (которое уже купили). или ничего не делать. \
Следовательно, наибольшая прибыль – максимальная разница всех пар в последовательности \
всех пар курсов акций.`, () => {
  const inout: [number[], number][] = [
    [[1, 2, 3, 4, 5, 6], 15],
    [[6, 5, 4, 3, 2, 1], 0],
    [[1, 6, 5, 10, 8, 7], 18],
    [[1, 2, 10, 2, 4, 6], 23],
  ];

  it.each(inout)("should work", (input, output) => {
    expect(exec(input)).toBe(output);
  });
});

function exec(input: number[]): number {
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
