import React, { useState, useEffect } from "react";

const getLocalStorage = <T>(key: string, initialValue: T): T => {
  const storage = localStorage.getItem(key);
  if (storage) return JSON.parse(storage);
  if (initialValue instanceof Function) return initialValue();
  return initialValue;
};

const setLocalStorage = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<T>] => {
  const [value, setValue] = useState(() => getLocalStorage(key, initialValue));

  useEffect(() => {
    setLocalStorage(key, value);
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
