import { useEffect, useState } from "react";
import { Store, useChromeStorage } from "../store/useChromeStorage";

export const useStorageData = () => {
  const [storageData, setStorageData] = useState<Store[]>();
  const { getStorage } = useChromeStorage();

  useEffect(() => {
    (async () => {
      const data = await getStorage("https://zenn.dev/search");
      console.log(data);
      setStorageData(data);
    })();
  }, [getStorage]);

  return {
    storageData,
  };
};
