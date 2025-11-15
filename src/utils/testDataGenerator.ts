/** Utility function to get a random integer between min and max (inclusive) */
const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Character sets
const LETTERS = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SPACES = " ";

/** Lightweight utility class for generating random test data */
class TestDataGenerator {
  /** Generates a random string of a specified length using the given character set */
  public generateRandomString(length: number, chars: string): string {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(getRandomInt(0, chars.length - 1));
    }
    return result;
  }

  /**
   * Generates a random title (4-10 chars) and text (8-20 chars)
   * @returns An object with `title` and `text` properties
   */
  public getRandomText(): { title: string; text: string } {
    const titleLength = getRandomInt(4, 10);
    const textLength = getRandomInt(8, 20);

    // Title: letters + numbers + emojis
    const titleChars = LETTERS + LETTERS.toUpperCase() + NUMBERS;
    let title = this.generateRandomString(titleLength, titleChars);
    title = title.charAt(0).toUpperCase() + title.slice(1);

    // Text: letters + numbers + emojis + spaces + special chars
    const textChars = LETTERS + LETTERS.toUpperCase() + NUMBERS + SPACES;
    const text = this.generateRandomString(textLength, textChars);

    return { title, text };
  }
}

export const _ = new TestDataGenerator();
