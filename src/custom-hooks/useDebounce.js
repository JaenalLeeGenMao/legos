import { useState, useEffect } from 'react';

/**
 *
 * @param {any} value
 * @param {number} delay
 * @returns value
 *
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 */
export default function useDebounce(value, delay) {

  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
}