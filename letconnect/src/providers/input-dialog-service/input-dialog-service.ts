import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { LetconnectServiceProvider } from '../../providers/letconnect-service/letconnect-service';


/*
  Generated class for the InputDialogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputDialogServiceProvider {

  constructor(public alertCtrl: AlertController, public dataService: LetconnectServiceProvider) {
    console.log('Hello InputDialogServiceProvider Provider');
  }

  showPrompot(item?, index?) {
    const prompt = this.alertCtrl.create({
      title:item ? 'Edit Item':"Add Item",
      message: item ? "Please Edit item...": "Please enter item name...",
      inputs: [
        {
          name: 'name',
          placeholder: 'Title',
          value:item ? item.name : null
        },
        {
          name: 'report',
          placeholder: 'message',
          value:item ? item.report: null
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: item => {
            console.log('Saved clicked', item); if (index !==undefined){
              this.dataService.editItem(item, index);
            }
            else{
              this.dataService.addItem(item);
            }
          }
        }
      ]
    });
    prompt.present();
  }

}
