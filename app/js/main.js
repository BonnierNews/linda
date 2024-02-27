import analyzer from "./analyzer.js";
import log from "./logger.js";
import {isRefreshChecked} from "./ui.js";

window.addEventListener("load", () => {
  analyzer.init();
});

log("main.js");
console.log("main"); // eslint-disable-line no-console

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tabId = tabs[0].id;

  chrome.scripting.executeScript({
    target: { tabId },
    files: [ "js/gtm.js" ],
    world: "MAIN",
  })
    .then(() => console.log("script injected")) // eslint-disable-line no-console
    .catch((e) => console.log("error injecting", e)); // eslint-disable-line no-console
});

if (chrome.devtools) { // Needed to be able to local dev with mocks
  chrome.runtime.onMessage.addListener((message) => {
    console.log("MESSAGE 2", {message}); // eslint-disable-line no-console
    log(`MESSAGE: ${JSON.stringify(message)}`);
    if (message.tabId !== chrome.devtools.inspectedWindow.tabId) return;
    switch (message.type) {
      case "reload":
        if (isRefreshChecked()) {
          analyzer.reset();
        }
        analyzer.newMessage({
          type: "GTM",
          summary: "Reload:auto",
        });
        // falls through
      case "gtm-tracking":
        analyzer.newMessage({
          type: "GTM",
          summary: "Summary:sum",
        });
        break;
    }
  });
}

window.addEventListener("message", (event) => {
  console.log("Message"); // eslint-disable-line no-console
  // We only accept messages from ourselves
  if (event.source !== window) {
    return;
  }

  console.log({event}); // eslint-disable-line no-console

  chrome.runtime.sendMessage(event);
}, false);
