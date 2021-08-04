function convert(s: string, numRows: number): string {
  if (numRows === 1) {
    return s;
  }
  const rows: string[] = new Array(Math.min(numRows, s.length)).fill("");

  let curRow = 0;
  let goingDown = false;

  for (let i = 0; i < s.length; i++) {
    rows[curRow] += s[i];

    if (curRow === 0 || curRow === numRows - 1) {
      goingDown = !goingDown;
    }

    curRow += goingDown ? 1 : -1;
  }

  return rows.join("");
}

describe("", () => {
  it("", () => {
    expect(convert("PAYPALISHIRING", 3)).toBe("PAHNAPLSIIGYIR");
    expect(convert("PAYPALISHIRING", 4)).toBe("PINALSIGYAHRPI");
  });
});
