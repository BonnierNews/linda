import log from './logger.js'
import updateUi from './ui.js'

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
  }

  reset() {
    this.messages = []
    updateUi(this.messages)
  }

  newMessage({tracker, type, status}) {
    this.messages.push({
      tracker,
      type,
      status
    })
    updateUi(this.messages)
  }

  handleRequest(_request) {
    log('onRequestFinished', _request)
    const {request, response} = _request
    const url = request.url
    const searchParams = getSearchParams(request)
    const {status} = response

    if (url.match(/\.scorecardresearch\.com/)) {
      log('DODO MMS', request)
      const tracker = 'MMS'
      const props = pick(searchParams, ['ns_st_ty', 'ns_st_ev', 'ns_st_ad', 'mms_campaignid', 'mms_customadid'])
      log('MMS', props)
      const type = props.join(':')
      this.newMessage({tracker, type, status})
    } else if (url.match(/https:\/\/www\.google-analytics\.com(\/r)?\/collect/)) {
      log('DODO GA', request)
      const tracker = 'GA'
      const props = pick(searchParams, ['t', 'ec', 'ea', 'cd35', 'el'])
      log('GA', props)
      const type = props.join(':')
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
