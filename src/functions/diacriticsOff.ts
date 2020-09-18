export const diacriticsOff = (txt: string) => {
  return txt
    .replace(/ۗ/g, "")
    .replace(/ ۚ/g, "")
    .replace(/ ۖ/g, "")
    .replace(/([^\u0621-\u063A\u0641-\u064A\u0660-\u0669a-zA-Z 0-9])/g, "")
    .replace(/  /g, " ");
};
