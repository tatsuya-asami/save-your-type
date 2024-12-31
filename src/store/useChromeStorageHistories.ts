import { useCallback } from "react";
import { HISTORIES_KEY, History } from "../shared/histories";

export type Store = History;

const STORAGE_KEY = HISTORIES_KEY;

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

  const sendValueToBackground = useCallback((value: Store) => {
    chrome.runtime.sendMessage({ type: STORAGE_KEY, value });
  }, []);

  return {
    getStorage,
    removeAllValue,
    removeValuesBefore,
    sendValueToBackground,
  };
};
