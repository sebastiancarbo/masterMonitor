import { Component, NgZone} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemDetailsPage } from '../item-details/item-details';
import { AddMasterNodePage } from '../add-masternode/add-masternode';
import { Storage } from '@ionic/storage';
//import { LocalNotifications } from '@ionic-native/local-notifications';
import {MonitoringServiceProvider} from '../../providers/monitoring-service/monitoring-service';
//import { BackgroundMode } from '@ionic-native/background-mode';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [MonitoringServiceProvider]
})
export class ListPage {
  items: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private storage: Storage, public monitoringServiceProvider: MonitoringServiceProvider,
              public zone: NgZone
              //public localNotifications: LocalNotifications,
              //public backgroundMode: BackgroundMode
              ) {

    console.log('ListPage created.')

    this.addItem = this.addItem.bind(this);
    this.refresh = this.refresh.bind(this);
    // this.backgroundMode.enable();
    //
    // this.backgroundMode.on('activate').subscribe(()=>{
    //   // this.localNotifications.schedule({
    //   //   id: new Date().getTime(),
    //   //   title: 'Activate',
    //   //   text: 'backgroundMode activated'
    //   // });
    // });

    // this.backgroundMode.on('deactivate').subscribe(()=>{
    //   // this.localNotifications.schedule({
    //   //   id: new Date().getTime(),
    //   //   title: 'Deactivate',
    //   //   text: 'backgroundMode deactivate'
    //   // });
    // });
  }

  ionViewWillEnter () {
    this.refresh();
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }

  addItem(value) {
    this.monitoringServiceProvider.loadStatus(value.cryptocurrency, value.address)
      .then(data => {
        this.zone.run(() => {
          value.status = data['status'];
          value.ip = data['ip'];

          this.storage.set(value.cryptocurrency + '_' + value.address, value);
        });
      });

    this.monitoringServiceProvider.loadBalance(value.cryptocurrency, value.address)
      .then(data => {
        this.zone.run(() => {

          if (!isNaN(data['balance']))
            value.balance = data['balance'];
          else
            value.balance = 0.0;

          this.storage.set(value.cryptocurrency + '_' + value.address, value);
        });
      });

    value.imageUrl = "assets/img/" +  value.cryptocurrency.toLowerCase() + ".png";

    //sort it list after adding a new value to the list
    this.items.push(value);
    this.items.sort(function (a, b) {
        if (a.cryptocurrency == b.cryptocurrency) {
          return a.name.localeCompare(b.name);
        } else {
          return a.cryptocurrency.localeCompare(b.cryptocurrency);
        }
    });
  }

  addTapped(event) {
    this.navCtrl.push(AddMasterNodePage, {});
  }

  refresh() {
    this.items = [];
    this.storage.forEach(this.addItem);
    // this.localNotifications.schedule({
    //   id: new Date().getTime(),
    //   title: 'Refresh',
    //   text: 'Refresh executed by the user'
    // });
  }
}
