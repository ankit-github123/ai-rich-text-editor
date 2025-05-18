export function extractFontSizeFromArray(arr: string[]): number {
  for (let str of arr) {
    if (str.startsWith("fontSize-")) {
      const sizePart: string = str.split("fontSize-")[1];
      const fontSize: number = parseInt(sizePart, 10);
      if (!isNaN(fontSize)) {
        return fontSize; // or push to a result array if multiple sizes
      }
    }
  }
  return 3; // or an empty array if collecting multiple
}

export function extractFontNameFromArray(arr: string[]): string {
  for (let str of arr) {
    if (str.startsWith("fontName-")) {
      return str.split("fontName-")[1]; // returns the font name as a string
    }
  }
  return "Open Sans, 'sans-serif'"; // default font name
}

export function removeQuotes(str: string): string {
  return str.replace(/^['"](.*)['"]$/, "$1");
}
