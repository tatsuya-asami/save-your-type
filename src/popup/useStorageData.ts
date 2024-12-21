import { useEffect, useState } from "react";
import { Store, useChromeStorage } from "../store/useChromeStorage";

export const useStorageData = () => {
  const [currentStorageData, setCurrentStorageData] = useState<Store[]>();
  const { getStorage } = useChromeStorage();

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const currentTabUrl = tabs[0].url;
      if (!currentTabUrl) {
        return;
      }
      const data = await getStorage(currentTabUrl);
      setCurrentStorageData(data);
    });
  }, [getStorage]);

  return {
    currentStorageData,
  };
};
