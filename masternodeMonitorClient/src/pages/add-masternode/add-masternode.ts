import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-add-masternode',
  templateUrl: 'add-masternode.html'
})
export class AddMasterNodePage {

  addMasternodeForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              private storage: Storage ) {

    this.addMasternodeForm = formBuilder.group({
      cryptocurrency: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9]{34}')])]
    });

  }

  save(){
    if(this.addMasternodeForm.valid){
      console.log("success!")
      console.log(this.addMasternodeForm.value);

      this.storage.set(this.addMasternodeForm.value.cryptocurrency + '_' + this.addMasternodeForm.value.address,
        this.addMasternodeForm.value);

      this.navCtrl.pop();
    }
  }
}
