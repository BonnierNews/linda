

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === "devtools-page") {
    chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
      if (changeInfo.status === "complete") {
        port.postMessage({type: "reload", tabId});
      }
    });
  }
});
