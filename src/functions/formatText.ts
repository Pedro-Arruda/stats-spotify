export const formatText = (text: string, max: number) => {
  if (text.length <= max) return text;

  return text.slice(0, max) + "...";
};
