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
    url: 'http://trafficgateway.research-int.se/TrafficCollector?rnr=1586010&siteId=d0909b11-2e34-4975-af83-c149b61a1f0a&clientId=12164f3d-edc4-44df-a835-0818d5ec47a4&cv=null&cp=%2Fstream%2Fnoje&mst=0&topLoc=https%3A%2F%2Fwww.expressen.se%2Fnoje%2Fsa-luras-tv-tittarna-av-mandelmanns%2F&referrer=http%3A%2F%2Fwww.expressen.se%2F&wh=689&ww=538',
  },
  response: {
    status: 302
  }
},{
  request: {
    method: 'GET',
    url: 'https://trafficgateway.research-int.se/TrafficCollector?rnr=1586010&siteId=d0909b11-2e34-4975-af83-c149b61a1f0a&clientId=12164f3d-edc4-44df-a835-0818d5ec47a4&cv=null&cp=%2Fstream%2Fnoje&mst=0&topLoc=https%3A%2F%2Fwww.expressen.se%2Fnoje%2Fsa-luras-tv-tittarna-av-mandelmanns%2F&referrer=https%3A%2F%2Fwww.expressen.se%2F&wh=689&ww=538',
  },
  response: {
    status: 302
  }
}, {
  request: {
    method: 'GET',
    url:   'https://sb.scorecardresearch.com/p?c1=2&c2=24459705&ns_site=total&ns_ap_pn=js&ns_ap_pfm=html&ns_type=hidden&ns_st_sv=6.1.1.171219&ns_st_pv=3.4.1.171220&ns_st_smv=5.8&ns_st_it=c&ns_st_id=1516636593176&ns_st_ec=5&ns_st_sp=1&ns_st_sc=1&ns_st_psq=3&ns_st_asq=2&ns_st_sq=2&ns_st_ppc=1&ns_st_apc=1&ns_st_spc=1&ns_st_cn=1&ns_st_ev=play&ns_st_po=45664&ns_st_cl=49963&ns_st_mp=html5&ns_st_mv=1.0&ns_st_pn=1&ns_st_tp=1&ns_st_ci=8443493&ns_st_pt=45241&ns_st_dpt=0&ns_st_ipt=0&ns_st_et=62342&ns_st_det=17101&ns_st_upc=45664&ns_st_dupc=149&ns_st_iupc=149&ns_st_upa=45664&ns_st_dupa=149&ns_st_iupa=149&ns_st_lpc=45664&ns_st_dlpc=149&ns_st_lpa=45664&ns_st_dlpa=149&ns_st_pa=45299&ns_ts=1516636657222&ns_st_bc=0&ns_st_dbc=0&ns_st_bt=379&ns_st_dbt=8&ns_st_bp=946&ns_st_skc=0&ns_st_dskc=0&ns_st_ska=0&ns_st_dska=0&ns_st_skd=0&ns_st_skt=0&ns_st_dskt=0&ns_st_pc=1&ns_st_dpc=0&ns_st_pp=1&ns_st_br=1423317&ns_st_rt=100&ns_st_ub=0&ns_st_vo=100&ns_st_ws=norm&ns_st_ki=1200000&ns_st_pr=*null&ns_st_sn=*null&ns_st_en=*null&ns_st_ep=*null&ns_st_ty=video&ns_st_ct=*null&ns_st_st=portalen&ns_st_dt=2018-01-21&ns_st_tm=21%3A35&ns_st_pu=*null&c3=*null&c4=*null&c6=*null&c7=https%3A%2F%2Fwww-livedata.expressen.se%2Fnyheter%2Fbrottscentralen%2Fde-kopplas-till-mordet-pa-arkefienden-i-gangkriget%2F&c8=De%20kopplas%20till%20mordet%20p%C3%A5%20%C3%A4rkefienden%20i%20g%C3%A4ngkriget%20%7C%20Brottscentralen%20%7C%20Expressen&c9=https%3A%2F%2Fwww-livedata.expressen.se%2F',
  },
  response: {
    status: 200
  }

}]

module.exports = requests
