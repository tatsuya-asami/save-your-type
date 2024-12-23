const HISTORIES_KEY = "save-your-type";

chrome.runtime.onMessage.addListener((message) => {
  switch (message.type) {
    case HISTORIES_KEY: {
      chrome.storage.local.get(HISTORIES_KEY, (result) => {
        const histories = result[HISTORIES_KEY] || [];
        chrome.storage.local.set({
          [HISTORIES_KEY]: [...histories, message.value],
        });
      });
      break;
    }
    default: {
      console.log("Unknown message type", message);
      break;
    }
  }
});
