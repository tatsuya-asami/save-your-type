export type Store = {
  url: string;
  datetime: string;
  identifier: string;
  value: string;
};

export const useChromeStorage = () => {
  const setStorage = (storeList: Store[]) => {
    const key = storeList?.[0].url ?? "unknown";

    return chrome.storage.local.set({
      [key]: storeList,
    });
  };

  const getStorage = (url: string) => {
    return new Promise<Store[] | undefined>((resolve) => {
      chrome.storage.local.get(url, (result) => {
        resolve(result[url]);
      });
    });
  };

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

  return { getStorage, pushValue, removeAllValue };
};