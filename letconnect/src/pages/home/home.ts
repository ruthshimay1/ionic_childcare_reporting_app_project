import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { LetconnectServiceProvider } from '../../providers/letconnect-service/letconnect-service';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Camera } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "letConnect";
  imgURL: any;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: LetconnectServiceProvider, public inputDialogService:InputDialogServiceProvider, public socialSharing: SocialSharing, private camera: Camera) {

  }

  loadItems(){
    return this.dataService.getItems();
  }

  removeItem(item, index) {
    console.log("Remove Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Removing Item - ' + index + "...",
      duration: 3000
    });
    toast.present();
    this.dataService.removeItem(index);

  }

  shareItem(item, index) {
    console.log("Share Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Sharing Item - ' + index + "...",
      duration: 3000
    });
    toast.present();

    let message = "Grocery Item - Name: " + item.name  + " - Quantity: " + item.quatity;
    let subject = "Share via Groceries app";

    this.socialSharing.share(message, subject).then(() => {
      // Sharing via email is possible
      console.log("Shared succdefully!")
    }).catch((error) => {
      console.error("Error while sharing", error);
    });

  }

  editItem(item, index) {
    console.log("Edit Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Edittitng Item - ' + index + "...",
      duration: 3000
    });
    toast.present();
    this.inputDialogService.showPrompot(item, index);

  }

  addItem() {
    console.log("Adding Item");
    this.inputDialogService.showPrompot();
  }

  // code for using camera
  getCamera(){
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.FILE_URI
    }).then((res) => {
      this.imgURL = res;

    }).catch(e => {
      console.log(e);
    })

  }


  getGallery(){
    this.camera.getPicture({
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.DATA_URL
    }).then((res) => {

      this.imgURL = 'data:image/jpeg:base64,' + res;
    }).catch(e => {
      console.log(e);
    })

  }


}
