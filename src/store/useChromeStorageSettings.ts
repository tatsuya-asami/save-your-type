import { useCallback, useEffect, useState } from "react";
import { Setting, SETTING_KEY } from "../chromeStorage/setting";

const DEFAULT_SETTING: Setting = {
  durationDaysToKeepHistories: 20,
  debounceTimeMs: 3000,
} as const;

export const useChromeStorageSettings = () => {
  const [settings, setSettings] = useState<Setting>(DEFAULT_SETTING);

  const setStorage = useCallback((setting: Setting) => {
    setSettings(setting);
    return chrome.storage.local.set({
      [SETTING_KEY]: setting,
    });
  }, []);

  const getStorage = useCallback(() => {
    return new Promise<Setting | undefined>((resolve) => {
      chrome.storage.local.get(SETTING_KEY, (result) => {
        if (chrome.runtime.lastError) {
          console.error("error", chrome.runtime.lastError);
          resolve(undefined);
        } else {
          resolve(result[SETTING_KEY]);
        }
      });
    });
  }, []);

  const updateSettings = <T extends keyof Setting>(
    key: T,
    value: Setting[T]
  ) => {
    getStorage()
      .then((setting) => {
        if (setting) {
          setStorage({ ...setting, [key]: value });
        } else {
          setStorage({ ...DEFAULT_SETTING, [key]: value });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getStorage()
      .then((setting) => {
        setSettings(setting ?? DEFAULT_SETTING);
      })
      .catch((error) => {
        console.error(error);
        setSettings(DEFAULT_SETTING);
      });
  }, [getStorage]);

  return { settings, updateSettings };
};
