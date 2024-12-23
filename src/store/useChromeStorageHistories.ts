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

  const RemoveOldestValues = useCallback(async () => {
    const store = await getStorage();
    if (!store || store.length === 0) {
      return;
    }
    store.shift();
    await setStorage(store);
  }, [getStorage, setStorage]);

  const pushValue = useCallback(
    async (newValue: Store) => {
      let store = await getStorage();
      let value = store ? [...store, newValue] : [newValue];

      let attempts = 0;
      while (attempts < 5) {
        try {
          await setStorage(value);
          return;
        } catch (error) {
          if (!(error instanceof Error)) {
            return;
          }
          if (error.message === "Storage limit exceeded") {
            console.warn("Storage limit exceeded. Removing oldest values...");
            await RemoveOldestValues();
            store = await getStorage();
            value = store ? [...store, newValue] : [newValue];
          } else {
            console.error("Failed to set storage:", error);
            return;
          }
        }
        attempts++;
      }

      console.error("Failed to push value after multiple attempts.");
    },
    [RemoveOldestValues, getStorage, setStorage]
  );

  const removeAllValue = () => {
    chrome.storage.local.remove(STORAGE_KEY);
  };

  const removeValuesBefore = useCallback(
    (durationDays: number) => {
      getStorage().then((store) => {
        if (!store) {
          return;
        }

        const before = new Date();
        before.setDate(before.getDate() - durationDays);

        setStorage(store.filter((s) => new Date(s.datetime) >= before));
      });
    },
    [getStorage, setStorage]
  );

  return { getStorage, pushValue, removeAllValue, removeValuesBefore };
};
