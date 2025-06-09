type CaseTransformOptions = {
  deep?: boolean;
};

const toCamelCase = (str: string): string => {
  // Special case for _id
  if (str === '_id') return 'id';
  
  const hasUnderscorePrefix = str.startsWith('_');
  const baseString = hasUnderscorePrefix ? str.slice(1) : str;
  
  const camelCased = baseString.toLowerCase().replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  return hasUnderscorePrefix ? `_${camelCased}` : camelCased;
};

const toSnakeCase = (str: string): string => {
  // Special case for id
  if (str === 'id') return 'id';
  
  const hasUnderscorePrefix = str.startsWith('_');
  const baseString = hasUnderscorePrefix ? str.slice(1) : str;
  
  const snakeCased = baseString
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/^_/, '');
  return hasUnderscorePrefix ? `_${snakeCased}` : snakeCased;
};

export const transformKeysToCamelCase = <T extends object>(
  obj: T,
  options: CaseTransformOptions = { deep: true }
): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) =>
      typeof item === 'object' && item !== null && options.deep
        ? transformKeysToCamelCase(item, options)
        : item
    );
  }

  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  return Object.keys(obj).reduce((acc, key) => {
    const camelKey = toCamelCase(key);
    const value = obj[key as keyof typeof obj];

    acc[camelKey] =
      typeof value === 'object' && value !== null && options.deep
        ? transformKeysToCamelCase(value, options)
        : value;

    return acc;
  }, {} as Record<string, any>);
};

export const transformKeysToSnakeCase = <T extends object>(
  obj: T,
  options: CaseTransformOptions = { deep: true }
): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) =>
      typeof item === 'object' && item !== null && options.deep
        ? transformKeysToSnakeCase(item, options)
        : item
    );
  }

  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  return Object.keys(obj).reduce((acc, key) => {
    const snakeKey = toSnakeCase(key);
    const value = obj[key as keyof typeof obj];

    acc[snakeKey] =
      typeof value === 'object' && value !== null && options.deep
        ? transformKeysToSnakeCase(value, options)
        : value;

    return acc;
  }, {} as Record<string, any>);
}; 