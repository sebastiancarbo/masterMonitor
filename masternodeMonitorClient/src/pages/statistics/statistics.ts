import { Component, NgZone} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {MonitoringServiceProvider} from '../../providers/monitoring-service/monitoring-service';

@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
  providers: [MonitoringServiceProvider]
})
export class StatisticsPage {
  coins: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public monitoringServiceProvider: MonitoringServiceProvider,
              public zone: NgZone) {

    this.coins = [
      {
        name: 'arcticcoin',
        symbol: 'ARC',
        imageUrl: "assets/img/arc.png",
        ticker: null,
        masternodes: null
      },
      {
        name: 'crave',
        symbol: 'CRAVE',
        imageUrl: "assets/img/crave.png",
        ticker: null,
        masternodes: null
      },
      {
        name: 'chaincoin',
        symbol: 'CHC',
        imageUrl: "assets/img/chc.png",
        ticker: null,
        masternodes: null
      },
      {
        name: 'monacocoin',
        symbol: 'XMCC',
        imageUrl: "assets/img/xmcc.png",
        ticker: null,
        masternodes: null
      }
    ];
    this.refresh = this.refresh.bind(this);
    this.getStatistics = this.getStatistics.bind(this);
  }

  ionViewWillEnter () {
    this.refresh();
  }

  getStatistics(coin) {
    this.monitoringServiceProvider.getTicker(coin.name)
      .then(data => {
        this.zone.run(() => {
          if (Array.isArray(data) && data.length == 1)
            coin.ticker = data[0];
        });
      });

    this.monitoringServiceProvider.getMasternode(coin.symbol)
      .then(data => {
        this.zone.run(() => {
          coin.masternodes = data;
        });
      });
  }


  refresh() {
    this.coins.forEach(this.getStatistics);
  }
}
