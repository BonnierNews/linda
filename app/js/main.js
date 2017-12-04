import analyzer from './analyzer.js'

window.addEventListener('load', () => {
  analyzer.init()
})

const backgroundPageConnection = chrome.runtime.connect({
  name: 'devtools-page'
})

backgroundPageConnection.onMessage.addListener((message) => {
  if (message.type === 'reload' && message.tabId === chrome.devtools.inspectedWindow.tabId) {
    analyzer.reset()
  }
})
