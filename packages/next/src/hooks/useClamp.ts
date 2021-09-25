export const useClamp = (min: string, max: string, rootFontSize: number) => {
  const minFontSize = Number(min.slice(0, -3));
  const maxFontSize = Number(max.slice(0, -3));

  const minWidth = 270 / rootFontSize;
  const maxWidth = 1920 / rootFontSize;

  const slope = (maxFontSize - minFontSize) / (maxWidth - minWidth);
  const yAxisIntersection = -minWidth * slope + minFontSize;

  return `
    clamp(${minFontSize}rem, ${yAxisIntersection}rem + ${
    slope * 100
  }vw, ${maxFontSize}rem)
  `;
};
