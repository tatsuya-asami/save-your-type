type Store = {
  url: string;
  datetime: string;
  identifier: string;
  value: string;
};
const HISTORIES_KEY = "save-your-type";

chrome.runtime.onMessage.addListener(
  async (message: { type: string; value: Store }) => {
    switch (message.type) {
      case HISTORIES_KEY: {
        try {
          const histories = await getHistories();
          await setHistories([...histories, message.value]);
        } catch (error) {
          console.error("Error accessing storage:", error);
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
