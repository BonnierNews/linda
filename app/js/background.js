console.log("Init backgound 1"); // eslint-disable-line no-console

// window.addEventListener("message", (event) => {
//   console.log("MESSAGE BG", event); // eslint-disable-line no-console
// });
chrome.runtime.onConnect.addListener((port) => {
  window.addEventListener("message", (event) => {
    console.log("MESSAGE BG", event); // eslint-disable-line no-console
  });
  if (port.name === "devtools-page") {
    chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
      console.log("BG: updage"); // eslint-disable-line no-console
      if (changeInfo.status === "complete") {
        port.postMessage({type: "reload", tabId});
      }
    });
  }


  // chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  //   console.log("BACKGROUND.JS 2"); // eslint-disable-line no-console
  //   if (changeInfo.status !== "complete" || !tab.url || tab.url === "chrome://newtab") {
  //     return;
  //   }

  //   console.log("BACKGROUND.JS 3"); // eslint-disable-line no-console

  //   chrome.scripting.executeScript({
  //     target: { tabId },
  //     files: ["gtm.js"]
  //   }, () => {
  //     const { lastError } = chrome.runtime;
  //     if (lastError) {
  //       // if (!tab.url.startsWith("chrome-extension://") && !tab.url.startsWith("chrome://newtab/")) {
  //       console.error(`Script injection failed: ${lastError.message} running on tab: ${tab.url} with tab ID: ${tabId}`,); // eslint-disable-line no-console
  //       // }
  //     }
  //   },
  //   );
  // });
});
