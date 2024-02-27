import log from "./logger.js";
import {updateRows, isPruneChecked, isThirdPartyChecked} from "./ui.js";

function pick(searchParams, keys) {
  return keys.map((key) => searchParams.get(key)).filter((x) => !!x);
}

function getSearchParams(request) {
  if (request.postData && request.postData.text) {
    return new URLSearchParams(request.postData.text);
  }

  return new URL(request.url).searchParams;
}

const ADDITIONAL_FILTERS = {
  "REY": "REY+GA",
};

class Analyzer {
  constructor() {
    this.onRequest = this.onRequest.bind(this);
    this.messages = [];
    this.filterText = "";
    this.typesToFilter = new Set();
    this.sites = [
      /^http(s)*:\/\/[^.]+\.expressen\.se/,
      /^http(s)*:\/\/[^.]+\.di\.se/,
      /^http(s)*:\/\/[^.]+\.dn\.se/,
    ];
    log("XXX 2");
  }

  updateUi() {
    const messages = this.filterMessages();
    updateRows(messages.map((o) => Object.assign({}, o, {
      filterText: this.filterText,
      prune: isPruneChecked(),
    })));
  }

  filterMessages() {
    function filterByType(messages, typesToFilter) {
      if (typesToFilter.size) {
        return messages.filter(({type}) => !typesToFilter.has(type));
      }
      return messages;
    }

    function filterThirdParty(messages, sites) {
      if (isThirdPartyChecked()) return messages;

      return messages.filter((message) => {
        if (message.type !== "GA") return true;

        const searchParamsList = message.searchParamsList.reduce((obj, searchParam) => {
          obj[searchParam[0]] = searchParam[1];

          return obj;
        }, {});

        if (sites.some((site) => searchParamsList.dl && site.test(searchParamsList.dl))) {
          return true;
        }

        return false;
      });
    }

    function filterDetailsByText(messages, _text, re) {
      if (!isPruneChecked()) return messages;

      return messages.map((_message) => {
        const message = Object.assign({}, _message);
        message.details = message.details.filter((detail) => detail.join("=").match(re));
        return message;
      });
    }

    function filterByText(messages, text) {
      if (!text) {
        return messages;
      }

      const re = new RegExp(text, "i");
      return filterDetailsByText(messages, text, re).filter((message) => {
        return message.details.length > 0 && message.searchParamsList.some((searchParamPair) => searchParamPair.join("=").match(re));
      });
    }

    const messagesFilteredByType = filterByType(this.messages, this.typesToFilter);
    const messagesFilteredByThirdParty = filterThirdParty(messagesFilteredByType, this.sites);
    return filterByText(messagesFilteredByThirdParty, this.filterText);
  }

  reset() {
    this.messages = [];
    this.updateUi();
  }

  setFilterText(value) {
    this.filterText = value;
    this.updateUi();
  }

  filterType({name, checked}) {
    const additionalFilter = ADDITIONAL_FILTERS[name];
    if (checked) {
      this.typesToFilter.delete(name);

      if (additionalFilter) {
        this.typesToFilter.delete(additionalFilter);
      }
    } else {
      this.typesToFilter.add(name);

      if (additionalFilter) {
        this.typesToFilter.add(additionalFilter);
      }
    }
    this.updateUi();
  }

  filterOnlyType(trackerLabels, {name}) {
    this.typesToFilter.clear();
    trackerLabels.forEach((label) => {
      const filterName = label.getElementsByTagName("input")[0].name;

      if (filterName !== name) {
        this.typesToFilter.add(filterName);

        const additionalFilter = ADDITIONAL_FILTERS[filterName];
        if (additionalFilter) {
          this.typesToFilter.add(additionalFilter);
        }
      }
    });

    this.updateUi();
  }

  newMessage({type, summary, searchParamsList}) {
    this.messages.push({
      type,
      searchParamsList,
      // short and long processed here to send to accordion UI directly
      summary,
      details: searchParamsList
    });
    this.updateUi();
  }

  handleRequest(_request) {
    const {request, response} = _request;
    const url = request.url;
    const searchParams = getSearchParams(request);
    const searchParamsList = Array.from(searchParams.entries());
    const {status} = response;

    if (url.match(/\/collect/) && searchParams.get("v") === "2") {
      // Google Analytics Version 4
      const type = "GA4";
      const props = pick(searchParams, ["en"]);
      const summary = `${this.renderType(type)} ${props.join(":")}`;
      this.newMessage({type, summary, status, searchParamsList});
    } else if (url.match(/https:\/\/www\.google-analytics\.com(\/[a-z])?\/collect/)) {
      // Google Analytics
      const type = "GA";
      const props = pick(searchParams, ["t", "ec", "ea", "cd35", "el"]);
      const summary = `${this.renderType(type)} ${props.join(":")}`;
      this.newMessage({type, summary, status, searchParamsList});
    } else if (url.match(/https?:\/\/trafficgateway.research-int.se\//)) {
      // SIFO
      const type = "SIFO";
      const sifoData = searchParams.get("data")
        .split("|")
        .map((keyVal) => keyVal.split("^"));

      const props = sifoData
        .filter(([key]) => ["event", "type"].includes(key))
        .map(([, value]) => value);

      const extendedSearchParamsList = searchParamsList.concat(sifoData.map(([key, value]) => {
        return [`__${key}`, value];
      }));

      const summary = `${this.renderType(type)} ${props.join(":")}`;
      this.newMessage({type, summary, status, searchParamsList: extendedSearchParamsList});
    } else if (url.match(/p\d\.parsely\.com/)) {
      // Parsely
      const type = "PLY";
      const action = searchParams.get("action");
      const summary = `${this.renderType(type)} ${action}`;
      this.newMessage({type, summary, status, searchParamsList});
    } else if (url.match(/https:\/\/jtp.expressen.se/)) {
      // JTP – Joel's Tracking Pixel
      const type = "JTP";
      const trackingType = url.slice(url.indexOf("/notify/") + 8, url.indexOf(".gif"));
      const summary = `${this.renderType(type)} ${trackingType}`;
      this.newMessage({type, summary, status, searchParamsList});
    } else if (url.match(/tracking\.bonnier\.news/)) {
      // Reynolds (and perhaps Google Analytics)
      let type = "REY";
      if (searchParams.get("send_to_ga") === "true") {
        type += "+GA";
      }
      const props = pick(searchParams, ["t", "ec", "ea", "cd35", "el"]);
      const summary = `${this.renderType(type)} ${props.join(":")}`;
      this.newMessage({type, summary, status, searchParamsList});
    }
  }

  renderType(type) {
    return `<span class="tracker-type">${type}</span>`;
  }

  onRequest(request) {
    try {
      this.handleRequest(request);
    } catch (e) {
      log("Unexpected error:", e.message, e.stack);
    }
  }

  init() {
    log("Init!");
    if (!chrome.devtools) {
      return this._mock();
    }
    chrome.devtools.network.onRequestFinished.addListener(this.onRequest);
  }

  _mock() {
    const requests = require("./mockRequests");
    requests.forEach((r, i) => {
      setTimeout(() => this.onRequest(r), (1000 * i) - (i * i * 50));
    });
  }
}

export default new Analyzer();
