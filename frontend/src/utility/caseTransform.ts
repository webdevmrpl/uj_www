type CaseTransformOptions = {
  deep?: boolean;
};

const toCamelCase = (str: string): string => {
  return str.toLowerCase().replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

const toSnakeCase = (str: string): string => {
  return str
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/^_/, '');
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