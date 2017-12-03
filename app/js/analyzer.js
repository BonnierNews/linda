import log from './logger.js'
import ui from './ui.js'

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

  newMessage({tracker, queryParams, status}) {
    this.messages.push({
      tracker,
      type: queryParams['ns_st_ad'] === 'preroll' ? 'preroll' : 'Meh',
      status
    })
    ui(this.messages)
  }

  onRequest(_request) {
    log('onRequestFinished', _request)
    const {request, response} = _request
    const {url, queryString} = request
    const queryParams = convertQueryParams(queryString)
    const {status} = response

    if (url.match(/scorecardresearch/)) {
      const tracker = 'mms'
      this.newMessage({tracker, url, queryParams, status})
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
