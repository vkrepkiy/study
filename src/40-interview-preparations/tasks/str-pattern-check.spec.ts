import { Pattern } from "./str-pattern-check";

describe(`Необходимо написать функцию, в которую будет передаваться строка \
содержащая только английские буквы и вторым аргументом своеобразное регулярное \
выражение. функция должна вернуть true, если строка совпадает с регулярным \
выражением учитывая правила, иначе – false.

Правила регулярки:
'H' - строка должна состоять из буквы 'H'
'.' – любой символ,
'H*' - сколько угодно символов H.

Использовать нативные регулярки запрещено. Регулярное выражение проверять \
на правильность не нужно.`, () => {
  const inout: [[string, string], boolean][] = [
    [["Hello", "Hello"], true],
    [["Hello", "Hel.o"], true],
    [["Hello", "....."], true],
    [["Hello", "Helllo"], false],
    [["Hello", "He.o"], false],
    [["Hello", "Hell"], false],

    [["Hellolo", "Hel*olo"], true],
    [["Hellolo", "Hell*olo"], true],
    [["Hellolo", "....."], false],
    [["Hellolo", "Hel*ol*"], false],
    [["Hellolo", "He.*llo..."], false],
  ];

  it.each(inout)("should be correct", ([stringToCheck, pattern], output) => {
    expect(new Pattern(pattern).validate(stringToCheck)).toBe(output);
  });
});
