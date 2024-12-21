import { useState } from "react";
import useDebounce from "react-use/lib/useDebounce";
import { Store, useChromeStorage } from "./useChromeStorage";

export const useStore = () => {
  const [tmpValue, setTmpValue] = useState<Store>();
  const { getStorage, pushValue } = useChromeStorage();

  useDebounce(
    async () => {
      if (!tmpValue) {
        return;
      }
      pushValue(tmpValue);
      console.log(await getStorage(tmpValue.url));
    },
    3000,
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

  const pushValueImmediately = () => {
    if (!tmpValue) {
      return;
    }
    pushValue(tmpValue);
  };

  return { saveValue, pushValueImmediately };
};
