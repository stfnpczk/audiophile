/**
 * Utility functions for formatting product names.
 */

const CATEGORY_SUFFIXES = ['HEADPHONES', 'EARPHONES', 'SPEAKERS', 'SPEAKER'];

export const formatProductName = (name: string, category: string) => {
  const upperName = name.toUpperCase();

  for (const suffix of CATEGORY_SUFFIXES) {
    const needle = ` ${suffix}`;
    if (upperName.endsWith(needle)) {
      return {
        name: name.slice(0, name.length - needle.length),
        category: suffix,
      };
    }
  }

  return {
    name,
    category: category.toUpperCase(),
  };
};

export const getShortName = (name: string): string => {
  return name
    .replace(/\s*\b(headphones|speakers?|earphones|wireless)\b/gi, '')
    .replace(/\bMark\b/gi, 'MK')
    .trim();
};
