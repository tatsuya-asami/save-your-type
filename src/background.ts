type Store = {
  url: string;
  datetime: string;
  identifier: string;
  value: string;
};
const HISTORIES_KEY = "save-your-type";

chrome.runtime.onMessage.addListener(
  async (message: { type: string; value: Store }) => {
    const { type, value: newValue } = message;
    switch (type) {
      case HISTORIES_KEY: {
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
              return;
            }
          }
          attempts++;
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

const getHistories = (): Promise<Store[]> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(
      HISTORIES_KEY,
      (result: { [HISTORIES_KEY]: Store[] }) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(result[HISTORIES_KEY] || []);
        }
      }
    );
  });
};

const setHistories = (value: Store[]) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ [HISTORIES_KEY]: value }, () => {
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
