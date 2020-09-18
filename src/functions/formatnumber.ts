export const formatNumber = (number: number) => {
  if (number / 100 >= 1) {
    return `${number}`;
  } else if (number / 10 >= 1) {
    return `0${number}`;
  } else {
    return `00${number}`;
  }
};
