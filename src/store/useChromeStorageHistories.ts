import { useCallback } from "react";
import { HISTORY_KEY, History } from "../chromeStorage/history";

export const useChromeStorageHistories = () => {
  const setStorage = useCallback((storeList: History[]) => {
    return chrome.storage.local.set({
      [HISTORY_KEY]: storeList,
    });
  }, []);

  const getStorage = useCallback(() => {
    return new Promise<History[] | undefined>((resolve) => {
      chrome.storage.local.get(HISTORY_KEY, (result) => {
        resolve(result[HISTORY_KEY]);
      });
    });
  }, []);

  const removeAllValue = () => {
    chrome.storage.local.remove(HISTORY_KEY);
  };

  const removeValuesBefore = useCallback(
    (durationDays: number) => {
      getStorage()
        .then((store) => {
          if (!store) {
            return;
          }

          const before = new Date();
          before.setDate(before.getDate() - durationDays);

          setStorage(store.filter((s) => new Date(s.datetime) >= before));
        })
        .catch((error) => {
          console.error("removeValuesBefore:", error);
        });
    },
    [getStorage, setStorage]
  );

  const sendValueToBackground = useCallback((value: History) => {
    try {
      chrome.runtime.sendMessage({ type: HISTORY_KEY, value });
    } catch (error) {
      console.error("sendValueToBackground:", error);
    }
  }, []);

  return {
    getStorage,
    removeAllValue,
    removeValuesBefore,
    sendValueToBackground,
  };
};
