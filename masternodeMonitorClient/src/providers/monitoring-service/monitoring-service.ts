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

}
