console.log("GTM GTM, GTM", window.dataLayer); // eslint-disable-line no-console
window.postMessage({type: "GTM", foo: 1}, "*");

window.addEventListener("message", (event) => {
  console.log("MESSAGE GTM", event); // eslint-disable-line no-console
});

setTimeout(() => {
  window.postMessage({type: "GTM2", foo: 1}, "*");
}, 4000);
// chrome.runtime.sendMessage({type: "GTM", foo: 1, bar: window.location.href, data: window.dataLayer});

// window.dataLayer = new Proxy(window.dataLayer, {
//   set(target, prop, val) {
//     console.log({target, prop, val}); // eslint-disable-line no-console
//     chrome.runtime.sendMessage({type: "gtm-tracking", data: {a: 1}});

//     return Reflect.set(target, prop, val);
//   }
// });

