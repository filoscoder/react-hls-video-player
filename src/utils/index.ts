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

export const secToTimeString = (secondsValue: number) => {
  const withLeadZero = (strInt: number) => String(strInt).padStart(2, "0");

  const hours = Math.floor(secondsValue / 3600);
  const minutes = Math.floor(secondsValue / 60);
  const seconds = Math.floor(secondsValue % 60);

  const hourStr = withLeadZero(hours);
  const minStr = withLeadZero(minutes);
  const secStr = withLeadZero(seconds);

  return `${hourStr === "00" ? "" : `${hourStr}:`}${minStr}:${secStr}`;
};

export const valueToLabel = (levelValue: number) =>
  levelValue === -1 ? "Auto" : `${levelValue}p`;
