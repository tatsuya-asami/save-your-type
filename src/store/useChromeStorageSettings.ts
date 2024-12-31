import { useCallback, useEffect, useState } from "react";
import { Setting, SETTING_KEY } from "../chromeStorage/setting";

const DEFAULT_STORE: Setting = {
  durationDaysToKeepHistories: 20,
  debounceTimeMs: 3000,
} as const;

export const useChromeStorageSettings = () => {
  const [settings, setSettings] = useState<Setting>(DEFAULT_STORE);

  const setStorage = useCallback((store: Setting) => {
    setSettings(store);
    return chrome.storage.local.set({
      [SETTING_KEY]: store,
    });
  }, []);

  const getStorage = useCallback(() => {
    return new Promise<Setting | undefined>((resolve) => {
      chrome.storage.local.get(SETTING_KEY, (result) => {
        resolve(result[SETTING_KEY]);
      });
    });
  }, []);

  const updateSettings = <T extends keyof Setting>(
    key: T,
    value: Setting[T]
  ) => {
    getStorage().then((store) => {
      if (store) {
        setStorage({ ...store, [key]: value });
      } else {
        setStorage({ ...DEFAULT_STORE, [key]: value });
      }
    });
  };

  useEffect(() => {
    getStorage().then((store) => {
      setSettings(store ?? DEFAULT_STORE);
    });
  }, [getStorage]);

  return { settings, updateSettings };
};
