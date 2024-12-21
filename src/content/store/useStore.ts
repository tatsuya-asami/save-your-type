import { useState } from "react";
import useDebounce from "react-use/lib/useDebounce";

export type Store = {
  datetime: string;
  identifier: string;
  url: string;
  value: string;
};

export const useStore = () => {
  const [tmpValue, setTmpValue] = useState<Store>();
  const [debouncedValue, setDebouncedValue] = useState<Store>();

  useDebounce(
    () => {
      setDebouncedValue(tmpValue);
      console.log(tmpValue, debouncedValue);
    },
    1000,
    [tmpValue]
  );

  const saveValue = (inputValue: Omit<Store, "datetime" | "url">) => {
    const value: Store = {
      ...inputValue,
      datetime: new Date().toISOString(),
      url: window.location.href,
    };
    setTmpValue(value);
  };

  return { saveValue };
};
