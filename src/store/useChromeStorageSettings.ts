import { useCallback, useEffect, useState } from "react";

export type Store = {
  durationDaysToKeepHistories: number;
  debounceTimeMs: number;
};

const DEFAULT_STORE: Store = {
  durationDaysToKeepHistories: 20,
  debounceTimeMs: 3000,
} as const;

const STORAGE_KEY = "settings";

export const useChromeStorageSettings = () => {
  const [settings, setSettings] = useState<Store>(DEFAULT_STORE);

  const setStorage = useCallback((store: Store) => {
    setSettings(store);
    return chrome.storage.local.set({
      [STORAGE_KEY]: store,
    });
  }, []);

  const getStorage = useCallback(() => {
    return new Promise<Store | undefined>((resolve) => {
      chrome.storage.local.get(STORAGE_KEY, (result) => {
        resolve(result[STORAGE_KEY]);
      });
    });
  }, []);

  const updateSettings = <T extends keyof Store>(key: T, value: Store[T]) => {
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
