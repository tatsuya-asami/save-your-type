import { useState } from "react";
import useDebounce from "react-use/lib/useDebounce";
import { Store, useChromeStorage } from "./useChromeStorage";

export const useStore = () => {
  const [tmpValue, setTmpValue] = useState<Store>();
  const [value, setStorage] = useChromeStorage();
  console.log(value);
  useDebounce(
    () => {
      if (!tmpValue) {
        return;
      }
      setStorage([...value, tmpValue]);
      console.log(tmpValue, value);
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
