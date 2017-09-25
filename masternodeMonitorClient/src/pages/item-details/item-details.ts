import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              private alertCtrl: AlertController
    ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }

  removeAlert() {
    let alert = this.alertCtrl.create({
      title: 'Remove Masternode',
      message: 'Are you sure you want to remove this Masternode?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Remove',
          handler: () => {
            this.remove();
          }
        }
      ]
    });
    alert.present();
  }

  remove(){
    this.storage.remove(this.selectedItem.cryptocurrency + '_' + this.selectedItem.address);
    this.navCtrl.pop();
  }
}
