export const rem = (px: number | `${number}px`): `${number}rem` => {
  switch (typeof px) {
    case "string":
      return `${Number(px.split("px")[0]) / 16}rem`;
    case "number":
      return `${px / 16}rem`;
    default:
      throw new Error("Invalid px type");
  }
};
