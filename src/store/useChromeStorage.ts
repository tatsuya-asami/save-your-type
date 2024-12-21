import { useCallback } from "react";

export type Store = {
  url: string;
  datetime: string;
  identifier: string;
  value: string;
};

export const useChromeStorage = () => {
  const setStorage = useCallback((storeList: Store[]) => {
    const key = storeList?.[0].url ?? "unknown";

    return chrome.storage.local.set({
      [key]: storeList,
    });
  }, []);

  const getStorage = useCallback((url: string) => {
    return new Promise<Store[] | undefined>((resolve) => {
      chrome.storage.local.get(url, (result) => {
        resolve(result[url]);
      });
    });
  }, []);

  const pushValue = (newValue: Store) => {
    getStorage(newValue.url).then((store) => {
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

  const getAllStorages = useCallback(() => {
    return new Promise<Store[]>((resolve) => {
      chrome.storage.local.get(null, (result) => {
        const storeList = Object.values(result).flat() as Store[];
        resolve(storeList);
      });
    });
  }, []);

  return { getStorage, pushValue, removeAllValue, getAllStorages };
};
