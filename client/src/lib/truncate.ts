export const truncate = (str: string, max: number): string => {
  return str.length > max ? str.substring(0, max - 1) + "..." : str;
};
