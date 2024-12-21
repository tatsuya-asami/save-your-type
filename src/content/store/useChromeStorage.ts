import { useChromeStorageLocal } from "use-chrome-storage";

export type Store = {
  datetime: string;
  identifier: string;
  url: string;
  value: string;
};

const SETTINGS_KEY = "save-your-type";

export const useChromeStorage = () => {
  return useChromeStorageLocal(SETTINGS_KEY, [
    {
      datetime: "",
      identifier: "",
      url: "",
      value: "",
    },
  ]);
};
