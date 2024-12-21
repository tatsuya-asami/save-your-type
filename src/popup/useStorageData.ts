import { useEffect, useState } from "react";
import { Store, useChromeStorage } from "../store/useChromeStorage";

export const useStorageData = () => {
  const [currentStorageData, setCurrentStorageData] = useState<Store[]>();
  const [allStorageData, setAllStorageData] = useState<Store[]>();
  const { getStorage, getAllStorages } = useChromeStorage();

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const currentTabUrl = tabs[0].url;
      if (!currentTabUrl) {
        return;
      }
      const data = await getStorage(currentTabUrl);
      setCurrentStorageData(data);
      setAllStorageData(await getAllStorages());
    });
  }, [getAllStorages, getStorage]);

  return {
    currentStorageData,
    allStorageData,
  };
};
