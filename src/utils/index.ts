export function extractFontSizeFromArray(arr) {
  for (let str of arr) {
    if (str.startsWith("fontSize-")) {
      const sizePart = str.split("fontSize-")[1];
      const fontSize = parseInt(sizePart, 10);
      if (!isNaN(fontSize)) {
        return fontSize; // or push to a result array if multiple sizes
      }
    }
  }
  return 3; // or an empty array if collecting multiple
}

export function extractFontNameFromArray(arr) {
  for (let str of arr) {
    if (str.startsWith("fontName-")) {
      return str.split("fontName-")[1]; // returns the font name as a string
    }
  }
  return "Open Sans, 'sans-serif'"; // default font name
}

export function removeQuotes(str) {
  return str.replace(/^['"](.*)['"]$/, "$1");
}
