import { HISTORY_KEY, History } from "./chromeStorage/history";

chrome.runtime.onMessage.addListener(
  async (message: { type: string; value: History }) => {
    const { type, value: newValue } = message;
    switch (type) {
      case HISTORY_KEY: {
        let histories = await getHistories();
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
              await removeOldHistories();
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

const removeOldHistories = async () => {
  const histories = await getHistories();
  if (!histories || histories.length === 0) {
    return;
  }
  histories.shift();
  histories.shift();
  histories.shift();
  await setHistories(histories);
};
