export const convertCmToPx = (sizeInCm: number) => {
  const pixels = (96 * sizeInCm) / 2.54;
  return pixels;
};
