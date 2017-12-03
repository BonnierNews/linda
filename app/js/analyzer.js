import log from './logger.js'
import ui from './ui.js'
import {pick} from './utils.js'

function convertQueryParams(queryStringArr) {
  return queryStringArr.reduce((res, {name, value}) => {
    res[name] = value
    return res
  }, {})
}

class Analyzer {
  constructor() {
    this.onRequest = this.onRequest.bind(this)
    this.messages = []
  }

  newMessage({tracker, type, status}) {
    this.messages.push({
      tracker,
      type,
      status
    })
    ui(this.messages)
  }

  handleRequest(_request) {
    log('onRequestFinished', _request)
    const {request, response} = _request
    const {url, queryString} = request
    const queryParams = convertQueryParams(queryString)
    const {status} = response

    if (url.match(/scorecardresearch/)) {
      const tracker = 'mms'
      log('Found mms')
      const props = pick(queryParams, ['ns_st_ty', 'ns_st_ev', 'ns_st_ad', 'mms_campaignid', 'mms_customadid'])
      log(props)
      const type = Object.values(props).filter(x => !!x).join(':')
      log('Type', type)
      this.newMessage({tracker, type, status})
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
    const requests = [{
      request: {
        url: 'http://b.scorecardresearch.com/p?c1=2&c2=24459705&ns_site=total',
        queryString: [
          {name: 'ns_st_ad', value: 'preroll'}
        ]
      },
      response: {
        status: 200
      }
    }, {
      request: {
        url: 'http://www.abc.com/xyz',
        queryString: []
      },
      response: {
        status: 200
      }
    }]

    requests.forEach((r, i) => {
      setTimeout(() => this.onRequest(r), 1000 * i)
    })

  }
}
export default new Analyzer()
