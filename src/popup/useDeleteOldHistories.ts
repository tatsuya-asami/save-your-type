import { useEffectOnce } from "react-use";
import { useChromeStorageHistories } from "../store/useChromeStorageHistories";
import { useChromeStorageSettings } from "../store/useChromeStorageSettings";

export const useDeleteOldHistories = () => {
  const {
    settings: { durationDaysToKeepHistories },
  } = useChromeStorageSettings();
  const { removeValuesBefore } = useChromeStorageHistories();

  useEffectOnce(() => {
    removeValuesBefore(durationDaysToKeepHistories);
  });
};
