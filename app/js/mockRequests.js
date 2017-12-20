const requests = [{
  request: {
    method: 'GET',
    url: 'http://b.scorecardresearch.com/p?c1=2&c2=24459705&ns_site=total&ns_st_ev=play&ns_st_ad=preroll&c7=https%3A%2F%2Fwww.expressen.se%2Ftvspelare%2Fvideo%2Ftv%2Fnyheter%2Fde-kraver-att-arbetsgivare-och-facket-ska-ta-det-har-pa-allvar%2F%3Fautoplay%3Dtrue%26startvolume%3D0%26starttime%3D0',
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
}, {
  request: {
    method: 'GET',
    url: 'https://trafficgateway.research-int.se/TrafficCollector?rnr=1586010&siteId=d0909b11-2e34-4975-af83-c149b61a1f0a&clientId=12164f3d-edc4-44df-a835-0818d5ec47a4&cv=null&cp=%2Fstream%2Fnoje&mst=0&topLoc=https%3A%2F%2Fwww.expressen.se%2Fnoje%2Fsa-luras-tv-tittarna-av-mandelmanns%2F&referrer=https%3A%2F%2Fwww.expressen.se%2F&wh=689&ww=538',
  },
  response: {
    status: 302
  }
},
]

module.exports = requests
