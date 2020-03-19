import { Component, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Router } from "@angular/router";
import { AlertController, LoadingController } from "@ionic/angular";
import { environment } from "../../environments/environment";
import axios from "axios";

import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { HTTP } from '@ionic-native/http/ngx';


@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.page.html',
  styleUrls: ['./mainmenu.page.scss'],
})
export class MainmenuPage implements OnInit {
  private kbytes;
  selectedImage: any;
  selectedImageB64: any;
  result: any;
  userid: any;
  fullname: any;

  constructor(
    private router: Router,
    public alertController: AlertController,
    private loadingCtrl: LoadingController,
    private storage: Storage,
    private camera: Camera,
    private webview: WebView,
    private base64: Base64,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    private http: HTTP
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.storage.get(environment.tokenKeyStorage.userid).then(res => {
      this.selectedImageB64 = '';
      this.result = '';
      this.userid = res;
      this.fullname = environment.fullNameUser[Number(res)];

      if(!res) {
        this.router.navigateByUrl('/login');
      }
    })
  }

  async onChoosePhoto() {
    this.fileChooser.open().then(uri => {
      this.filePath.resolveNativePath(uri).then((nativePath) => {
        this.base64.encodeFile(nativePath).then((base64string) => {
          if (this.calculateImageSize(base64string) > 3000) {
            alert("Please upload an image ioionbelow 3000 MB.");
          }
          else {
            this.selectedImage = this.webview.convertFileSrc(nativePath);
            // alert(base64string);
            this.selectedImageB64 = base64string;
          }
        })
      })
    })
    .catch(e => {
      console.log(e);
    })
  }

  async onTakePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
      this.selectedImage = this.webview.convertFileSrc(imageData);
      this.base64.encodeFile(imageData).then((base64string) => {
        //alert(base64string);
        this.selectedImageB64 = base64string;
      })
    }, (err) => {

    });
  }

  async onPredict() {
    let homePage = this;
    if(this.selectedImageB64 == '') {
      this.presentAlert('Please Insert Photo!');
    }
    else {
      // alert(this.userid);
      let splitBase64Result = this.selectedImageB64.split(',');
      // alert(splitBase64Result[1]);
      // alert(environment.endPointConstant.predictEndPoint);
      let data = {
        user_id: this.userid,
        base64string: splitBase64Result[1]
      }
      
      axios({
        method: 'put',
        url: environment.endPointConstant.predictEndPoint,
        headers: {
          "Content-Type": "application/json",
          "Allow-Control-Allow-Origin": "127.0.0.1:5000",
          // "Access-Control-Allow-Methods":
          // "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        },
        data
      })
      .then(function (res) {
        // alert(res.data);
        if(res.data === "Validated") {
          homePage.result = "Welcome " + environment.fullNameUser[Number(homePage.userid)] + " Checkin Success"
        }
        else {
          homePage.result = "Checkin Failed, Detected " + environment.fullNameUser[Number(res.data)] + "'s Face"
        }
      })
      .catch(err => {
        alert(err);
      });
    }
  }

  async presentAlert(stringNotification) {
    const alertFailed = await this.alertController.create({
      header: "",
      message: stringNotification,
      buttons: ["OK"]
    });

    await alertFailed.present();
  }

  calculateImageSize(base64String) {
    let padding, inBytes, base64StringLength;
    if(base64String.endsWith("==")) padding = 2;
    else if (base64String.endsWith("=")) padding = 1;
    else padding = 0;
    base64StringLength = base64String.length;
    inBytes =(base64StringLength / 4 ) * 3 - padding;
    this.kbytes = inBytes / 1000;
    return this.kbytes;
  }
}
