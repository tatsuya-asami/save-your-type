import { useEffect, useState } from "react";
import { useChromeStorageHistories } from "../store/useChromeStorageHistories";
import { History } from "../shared/history";

export const useStorageData = () => {
  const [storageData, setStorageData] = useState<History[]>();
  const { getStorage } = useChromeStorageHistories();

  useEffect(() => {
    (async () => {
      const data = await getStorage();
      setStorageData(data);
    })();
  }, [getStorage]);

  return {
    storageData,
  };
};
