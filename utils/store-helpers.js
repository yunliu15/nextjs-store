export const ensureStartsWith = (stringToCheck, startsWith) =>
  stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : `${startsWith}${stringToCheck}`;
