import { HISTORY_KEY, History } from "./chromeStorage/history";

chrome.runtime.onMessage.addListener(
  async (message: { type: string; value: History }) => {
    const { type, value: newValue } = message;
    switch (type) {
      case HISTORY_KEY: {
        let histories = await getHistories();

        if (isDuplicateLastHistory(histories, newValue)) {
          return;
        }

        let value = histories ? [...histories, newValue] : [newValue];
        let attempts = 0;

        while (attempts < 5) {
          try {
            await setHistories(value);
            return;
          } catch (error) {
            if (!(error instanceof Error)) {
              return;
            }
            if (error.message === "Storage limit exceeded") {
              console.warn("Storage limit exceeded. Removing oldest values...");
              await removeOldestDateHistories();
              histories = await getHistories();
              value = histories ? [...histories, newValue] : [newValue];
            } else {
              console.error("Failed to set storage:", error);
            }
            await new Promise((resolve) => setTimeout(resolve, 1000));
            attempts++;
          }
        }

        break;
      }
      default: {
        console.log("Unknown message type", message);
        break;
      }
    }
  }
);

const getHistories = (): Promise<History[]> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(
      HISTORY_KEY,
      (result: { [HISTORY_KEY]: History[] }) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(result[HISTORY_KEY] || []);
        }
      }
    );
  });
};

const setHistories = (value: History[]) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ [HISTORY_KEY]: value }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve("success");
      }
    });
  });
};

const removeOldestDateHistories = async () => {
  const histories = await getHistories();
  if (!histories || histories.length === 0) {
    return;
  }
  const oldestDate = histories.at(0)?.datetime;
  if (!oldestDate) {
    return;
  }
  const newHistories = histories.filter((h) => {
    return (
      new Date(h.datetime).toDateString() !==
      new Date(oldestDate).toDateString()
    );
  });
  await setHistories(newHistories);
};

const isDuplicateLastHistory = (histories: History[], newValue: History) => {
  if (!histories.length) {
    return false;
  }
  const lastHistory = histories.at(-1);
  if (!lastHistory) {
    return false;
  }

  if (
    lastHistory.url === newValue.url &&
    lastHistory.identifier === newValue.identifier &&
    lastHistory.value === newValue.value
  ) {
    return true;
  }

  return false;
};
