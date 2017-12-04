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
        method: 'GET',
        url: 'http://b.scorecardresearch.com/p?c1=2&c2=24459705&ns_site=total&ns_st_ev=play&ns_st_ad=preroll',
      },
      response: {
        status: 200
      }
    }, {
      request: {
        method: 'GET',
        url: 'http://www.abc.com/xyz'
      },
      response: {
        status: 200
      }
    }, {
      request: {
        method: 'POST',
        url: 'https://www.google-analytics.com/collect',
        postData: {
          mimeType: 'text/plain;charset=UTF-8',
          text: 'v=1&t=event&ni=0&ec=video&ea=pause&el=content%20pause&cd9=0&cd10=1&cd12=2017-10-14&cd13=08%3A18&cd14=oskar%20m%C3%A5nsson&cd15=fotboll&cd16=person%2Fzlatan%20ibrahimovic&cd22=1&cd23=1&cd24=1&cd25=0&cd26=0&cd30=portrait&cd33=1&cd34=1&cd42=standard-article&cd48=1&cd50=23%3A03&cd51=sport&cg1=sport&cd52=fotboll&cg2=fotboll&cg5=article&cd56=1&cd60=zlatans%20dolda%20bolag%20i%20sverige&cd72=expressen&cd78=infinity&cd79=n%2Fa&cd82=n%2Fa&cd81=1&cd35=video%20content&cd49=har%20ar%20zlatans%20hemliga%20bolag&z=414077281'
        }
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
