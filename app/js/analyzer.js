import log from './logger.js'
import {updateRows, isOnlyMatchedChecked} from './ui.js'

function pick(searchParams, keys) {
  return keys.map(key => searchParams.get(key)).filter(x => !!x)
}

function getSearchParams(request) {
  if (request.method === 'GET') {
    return new URL(request.url).searchParams
  }
  if (request.postData && request.postData.text) {
    return new URLSearchParams(request.postData.text)
  }

  return new URLSearchParams()
}

class Analyzer {
  constructor() {
    this.onRequest = this.onRequest.bind(this)
    this.messages = []
    this.filterText = ''
    this.typesToFilter = new Set()
  }

  updateUi() {
    const messages = this.filterMessages()
    updateRows(messages.map(o => Object.assign({}, o, {
      filterText: this.filterText,
      onlyMatched: isOnlyMatchedChecked(),
    })))
  }

  filterMessages() {
    function filterByType(messages, typesToFilter) {
      if (typesToFilter.size) {
        return messages.filter(({type}) => !typesToFilter.has(type))
      }
      return messages
    }

    function filterDetailsByText(messages, text, re) {
      if (!isOnlyMatchedChecked()) return messages

      return messages.map((_message) => {
        const message = Object.assign({}, _message)
        message.details = message.details.filter((detail) => detail.join('=').match(re))
        return message
      })
    }

    function filterByText(messages, text) {
      if (!text) {
        return messages
      }

      const re = new RegExp(text, 'i')
      return filterDetailsByText(messages, text, re).filter((message) => {
        return message.details.length > 0 && message.searchParamsList.some((searchParamPair) => searchParamPair.join('=').match(re))
      })
    }

    const messagesFilteredByType = filterByType(this.messages, this.typesToFilter)
    return filterByText(messagesFilteredByType, this.filterText)
  }

  reset() {
    this.messages = []
    this.updateUi()
  }

  setFilterText(value) {
    this.filterText = value
    this.updateUi()
  }

  filterType({target}) {
    const {name, checked} = target
    if (checked) {
      this.typesToFilter.delete(name)
    } else {
      this.typesToFilter.add(name)
    }
    this.updateUi()
  }

  newMessage({type, summary, searchParamsList}) {
    this.messages.push({
      type,
      searchParamsList,
      // short and long processed here to send to accordion ui directly
      summary,
      details: searchParamsList
    })
    this.updateUi()
  }

  handleRequest(_request) {
    const {request, response} = _request
    const url = request.url
    const searchParams = getSearchParams(request)
    const searchParamsList = Array.from(searchParams.entries())
    const {status} = response

    if (url.match(/\.scorecardresearch\.com/)) {
      const type = 'MMS'
      // ns_st_ty = video, advertisement  // type
      // ns_st_ev = play, pause,end, hb (event type), MMS sends itself listening after video
      // ns_st_ad =	preroll, postroll

      const props = pick(searchParams, ['ns_st_ty', 'ns_st_ev', 'ns_st_ad', 'mms_campaignid', 'mms_customadid'])
      const summary = `${type} ${props.join(':')}`
      this.newMessage({type, summary, status, searchParamsList})
    } else if (url.match(/https:\/\/www\.google-analytics\.com(\/r)?\/collect/)) {
      const type = 'GA'
      const props = pick(searchParams, ['t', 'ec', 'ea', 'cd35', 'el'])
      const summary = `${type} ${props.join(':')}`
      this.newMessage({type, summary, status, searchParamsList})
    } else if (url.match(/https?:\/\/trafficgateway.research-int.se\//)) {
      const type = 'SIFO'
      const props = pick(searchParams, ['cp'])
      const summary = `${type} ${props.join(':')}`
      this.newMessage({type, summary, status, searchParamsList})
    } else if (url.match(/https?:\/\/..\.lp4\.io\//)) {
      const type = 'LP'
      const props = pick(searchParams, ['ps'])
      const path = url.match(/\/[a-z]+\?/)[0].replace(/[^a-z]/g, '')

      switch (path) {
        case 'p':
          props.unshift('pageview')
          break
        case 'pl':
          props.unshift('pageload')
          break
        case 'c':
          props.unshift('click')
          break
        case 'is':
          props.unshift('inscreen')
          break
        case 'u':
          props.unshift('unique users')
          break
        case 'v':
          props.unshift('video')
          break
      }
      const summary = `${type} ${props.join(':')}`
      this.newMessage({type, summary, status, searchParamsList})
    }
  }

  onRequest(request) {
    try {
      this.handleRequest(request)
    } catch (e) {
      log('Unexpected error:', e.message, e.stack)
    }
  }

  init() {
    log('Init!')
    if (!chrome.devtools) {
      return this._mock()
    }
    chrome.devtools.network.onRequestFinished.addListener(this.onRequest)
  }

  _mock() {
    const requests = require('./mockRequests')
    requests.forEach((r, i) => {
      setTimeout(() => this.onRequest(r), 1000 * i)
    })
  }
}
export default new Analyzer()
