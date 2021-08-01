enum PatternNodeType {
  anyLetter = "ANY_LETTER",
  letter = "LETTER",
}

interface PatternNodeOptions {
  type: PatternNodeType;
  value: string;
  checkAsManyAsPossible: boolean;
}

class PatternNode {
  constructor(
    private options: PatternNodeOptions,
    public readonly next: PatternNode | null
  ) {}

  public validate(str: string): boolean {
    return this.options.checkAsManyAsPossible
      ? this.validateMultiple(str)
      : this.validateSingle(str);
  }

  private validateLetter(letter: string): boolean {
    if (this.options.type === PatternNodeType.anyLetter) {
      return true;
    } else {
      return this.options.value === letter[0];
    }
  }

  private nextOrResult(str: string, isValid: boolean): boolean {
    return isValid && this.next ? this.next.validate(str) : isValid && !str;
  }

  private validateSingle(str: string): boolean {
    const isValid = this.validateLetter(str[0]);
    const nextStrPart = str.slice(1);
    return this.nextOrResult(nextStrPart, isValid);
  }

  private validateMultiple(str: string): boolean {
    let atLeastOneIsValid = false;

    for (let i = 0; i < str.length; i++) {
      /**
       * If the letter is valid we should try to check more
       */
      if (this.validateLetter(str[i])) {
        atLeastOneIsValid = true;
        continue;
      }

      /**
       * If the letter is invalid, but we have at least one valid, then continue
       */
      if (atLeastOneIsValid) {
        return this.nextOrResult(str.slice(i), true);
      }

      /**
       * If nothing is valid, return false
       */
      return false;
    }

    return false;
  }

  public static createFromOptionsList(
    options: PatternNodeOptions[],
    start: number = 0
  ): PatternNode {
    const nextI = start + 1;
    const nextNode =
      nextI < options.length
        ? PatternNode.createFromOptionsList(options, nextI)
        : null;

    return new PatternNode(options[start], nextNode);
  }
}

export class Pattern {
  public readonly firstNode: PatternNode;

  public static multiplier = "*";

  constructor(private initPattern: string) {
    this.firstNode = PatternNode.createFromOptionsList(
      Pattern.parsePattern(initPattern)
    );
  }

  public validate(str: string) {
    const result = this.firstNode.validate(str);
    console.log(str, this.initPattern, result);
    return result;
  }

  private static parsePattern(pattern: string): PatternNodeOptions[] {
    const result: PatternNodeOptions[] = [];

    for (let i = 0; i < pattern.length; i++) {
      const token = pattern[i];
      const nextToken = pattern[i + 1];

      if (token === Pattern.multiplier) {
        continue;
      }

      result.push({
        type:
          token === "." ? PatternNodeType.anyLetter : PatternNodeType.letter,
        value: token,
        checkAsManyAsPossible: nextToken === Pattern.multiplier,
      });
    }

    return result;
  }
}
