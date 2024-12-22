import { useCallback } from "react";

export type Store = {
  url: string;
  datetime: string;
  identifier: string;
  value: string;
};

const STORAGE_KEY = "save-your-type";

export const useChromeStorageHistories = () => {
  const setStorage = useCallback((storeList: Store[]) => {
    return chrome.storage.local.set({
      [STORAGE_KEY]: storeList,
    });
  }, []);

  const getStorage = useCallback(() => {
    return new Promise<Store[] | undefined>((resolve) => {
      chrome.storage.local.get(STORAGE_KEY, (result) => {
        resolve(result[STORAGE_KEY]);
      });
    });
  }, []);

  const pushValue = (newValue: Store) => {
    getStorage().then((store) => {
      if (store) {
        setStorage([...store, newValue]);
      } else {
        setStorage([newValue]);
      }
    });
  };

  const removeAllValue = () => {
    chrome.storage.local.clear();
  };

  return { getStorage, pushValue, removeAllValue };
};
