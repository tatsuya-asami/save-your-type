import { useState } from "react";
import useDebounce from "react-use/lib/useDebounce";
import { Store, useChromeStorageHistories } from "./useChromeStorageHistories";
import { useChromeStorageSettings } from "./useChromeStorageSettings";

export const useStore = () => {
  const [tmpValue, setTmpValue] = useState<Store>();
  const {
    settings: { debounceTimeMs },
  } = useChromeStorageSettings();
  const { sendValueToBackground } = useChromeStorageHistories();

  const [isReady, cancel] = useDebounce(
    async () => {
      if (!tmpValue) {
        return;
      }
      sendValueToBackground(tmpValue);
      setTmpValue(undefined);
    },
    debounceTimeMs,
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
    // isReady is return null or true when not typing. return false when debouncing.
    if (isReady() === null || isReady() === true) {
      return;
    }
    cancel();
    const value: Store = {
      ...inputValue,
      datetime: new Date().toISOString(),
      url: window.location.href,
    };
    sendValueToBackground(value);
  };

  const pushValueImmediately = () => {
    if (!tmpValue) {
      return;
    }
    // send background because async function is not allowed in beforeunload event
    sendValueToBackground(tmpValue);
  };

  return {
    saveValue,
    cancelPrevValueAndPushCurrentValue,
    pushValueImmediately,
  };
};
