import { useState } from "react";
import useDebounce from "react-use/lib/useDebounce";
import { useChromeStorageHistories } from "./useChromeStorageHistories";
import { useChromeStorageSettings } from "./useChromeStorageSettings";
import { History } from "../chromeStorage/history";

export const useStore = () => {
  const [tmpValue, setTmpValue] = useState<History>();
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

  const saveValue = (inputValue: Omit<History, "datetime" | "url">) => {
    const value: History = {
      ...inputValue,
      datetime: new Date().toISOString(),
      url: window.location.href,
    };
    setTmpValue(value);
  };

  const cancelPrevValueAndPushCurrentValue = (
    inputValue: Omit<History, "datetime" | "url">
  ) => {
    // isReady is return null or true when not typing. return false when debouncing.
    if (isReady() === null || isReady() === true) {
      return;
    }
    cancel();
    const value: History = {
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
