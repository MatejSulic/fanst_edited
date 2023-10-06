export const questionTypeTypes = [
  "PLAIN_TEXT",
  "IMAGE_SELECT",
  "2AFC",
  "DRAW_LINE", //alternativa SINGLE_IMAGE_ANGLE - srovnani s nastrojem Poor
  "SINGLE_IMAGE_TWO_CHOICES",
  "SINGLE_IMAGE_ANGLE", //pro natoceni obrazku - srovnani s nastrojem Poor
  "SINGLE_IMAGE_INPUT_VALUE", //pro urceni miry symetrie - srovnani s nastrojem Manak
  "SINGLE_IMAGE_TWO_CHOICES_CALIBRATION", //finalni testovaci verze s kalibraci
] as const;
