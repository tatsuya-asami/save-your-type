import { useState } from "react";
import useDebounce from "react-use/lib/useDebounce";
import { Store, useChromeStorageHistories } from "./useChromeStorageHistories";
import { useChromeStorageSettings } from "./useChromeStorageSettings";

export const useStore = () => {
  const [tmpValue, setTmpValue] = useState<Store>();
  const {
    settings: { debounceTimeMs },
  } = useChromeStorageSettings();
  const { pushValue } = useChromeStorageHistories();

  const [isReady, cancel] = useDebounce(
    async () => {
      if (!tmpValue) {
        return;
      }
      pushValue(tmpValue);
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
    // send background because async function is not allowed in beforeunload event
    chrome.runtime.sendMessage({ type: "save-your-type", value: tmpValue });
  };

  return {
    saveValue,
    cancelPrevValueAndPushCurrentValue,
    pushValueImmediately,
  };
};
