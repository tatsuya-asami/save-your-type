import { useState } from "react";
import useDebounce from "react-use/lib/useDebounce";
import { Store, useChromeStorage } from "./useChromeStorage";

export const useStore = () => {
  const [tmpValue, setTmpValue] = useState<Store>();
  const [storage, setStorage] = useChromeStorage();

  useDebounce(
    () => {
      if (!tmpValue) {
        return;
      }
      setStorage([...storage, tmpValue]);
      console.log(storage);
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
