import { useEffect, useState } from "react";
import {
  Store,
  useChromeStorageHistories,
} from "../store/useChromeStorageHistories";

export const useStorageData = () => {
  const [storageData, setStorageData] = useState<Store[]>();
  const { getStorage } = useChromeStorageHistories();

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
