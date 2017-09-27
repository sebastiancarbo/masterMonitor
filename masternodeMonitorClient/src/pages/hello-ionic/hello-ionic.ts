import { Component } from '@angular/core';
import { Clipboard } from '@ionic-native/clipboard';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  constructor(private clipboard: Clipboard) {

  }

  copyAddress(address) {
    this.clipboard.copy(address);
  }
}
