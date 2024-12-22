import { useEffect, useState } from "react";
import { Store, useChromeStorage } from "../store/useChromeStorage";

export const useStorageData = () => {
  const [storageData, setStorageData] = useState<Store[]>();
  const { getStorage } = useChromeStorage();

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, async () => {
      const data = await getStorage();
      setStorageData(data);
    });
  }, [getStorage]);

  return {
    storageData,
  };
};
