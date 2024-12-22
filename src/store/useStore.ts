import { useState } from "react";
import useDebounce from "react-use/lib/useDebounce";
import { Store, useChromeStorageHistories } from "./useChromeStorageHistories";

export const useStore = () => {
  const [tmpValue, setTmpValue] = useState<Store>();
  const { pushValue } = useChromeStorageHistories();

  const [isReady, cancel] = useDebounce(
    async () => {
      if (!tmpValue) {
        return;
      }
      pushValue(tmpValue);
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

  const cancelPrevValueAndPushCurrentValue = (
    inputValue: Omit<Store, "datetime" | "url">
  ) => {
    if (isReady()) {
      return;
    }
    cancel();
    const value: Store = {
      ...inputValue,
      datetime: new Date().toISOString(),
      url: window.location.href,
    };
    pushValue(value);
  };

  const pushValueImmediately = () => {
    if (!tmpValue) {
      return;
    }
    pushValue(tmpValue);
  };

  return {
    saveValue,
    cancelPrevValueAndPushCurrentValue,
    pushValueImmediately,
  };
};
