import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';

/*
  Generated class for the MonitoringServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MonitoringServiceProvider {
	//apiUrl: any;

  constructor(public http: Http, public platform: Platform) {
  }

  loadStatus(cryptocurrency, address) {

    return new Promise(resolve => {
      let url;
      if (this.platform.is('android'))
        if (cryptocurrency === 'XMCC' || cryptocurrency === 'ARC')
          url = 'http://45.63.78.18:3000/masterNode/' + cryptocurrency +'/'+ address +'/status';
        else
          url = 'http://45.32.166.226:3000/masterNode/' + cryptocurrency +'/'+ address +'/status';
      else
        url = '/api/masterNode/' + cryptocurrency +'/'+ address +'/status';

      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  loadBalance(cryptocurrency, address) {

    return new Promise(resolve => {
      let url;
      if (this.platform.is('android'))
        if (cryptocurrency === 'XMCC' || cryptocurrency === 'ARC')
          url = 'http://45.63.78.18:3000/masterNode/' + cryptocurrency +'/'+ address +'/balance';
        else
          url = 'http://45.32.166.226:3000/masterNode/' + cryptocurrency +'/'+ address +'/balance';
      else
        url = '/api/masterNode/' + cryptocurrency +'/'+ address +'/balance';

      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getTicker(coinName) {

    return new Promise(resolve => {
      let url;
      if (this.platform.is('android'))
        url = 'https://api.coinmarketcap.com/v1/ticker/';
      else
        url = '/coinmarketcapApi/v1/ticker/';

      url = url + coinName;

      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getMasternode(cryptocurrency) {

    return new Promise(resolve => {
      let url;
      if (this.platform.is('android'))
        if (cryptocurrency === 'XMCC' || cryptocurrency === 'ARC')
          url = 'http://45.63.78.18:3000/masterNode/' + cryptocurrency;
        else
          url = 'http://45.32.166.226:3000/masterNode/' + cryptocurrency;
      else
        url = '/api/masterNode/' + cryptocurrency;

      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

}
