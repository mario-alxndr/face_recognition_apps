import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Router } from "@angular/router";
import { AlertController, LoadingController } from "@ionic/angular";
import { environment } from "../../environments/environment";
import axios from "axios";

@Component({
selector: "app-login",
templateUrl: "./login.page.html",
styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  stringLoading = "Please wait. We are checking your login informations."

  constructor(
    private router: Router,
    public alertController: AlertController,
    private loadingCtrl: LoadingController,
    private storage: Storage
) {}

  ngOnInit() {}

  async onLogin(form) {
    let stringNotification = "";
    let loginSuccess = false;
    let counter = 0;
    let loginPage = this;

    if (!form.value.user_name || !form.value.password) {
      stringNotification += " Please enter your ";
      if (!form.value.user_name) {
        stringNotification += "username";
        counter++;
      }
      if (!form.value.password) {
        if (counter > 0) {
          stringNotification += " & ";
        }
        stringNotification += "password";
        counter++;
      }
      loginPage.presentAlert(stringNotification);
    } 
    
    else {
      // loginPage.presentLoading(this.stringLoading);
      let data = {
        user_name: form.value.user_name,
        password: form.value.password
      };

      axios({
        method: "post",
        url: environment.endPointConstant.loginEndPoint,
        headers: {
          "Content-Type": "application/json",
          "Allow-Control-Allow-Origin": "127.0.0.1:5000",
          // "Access-Control-Allow-Methods":
          // "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        },
        data
      })
      .then(res => {
        console.log(res);
        // loginPage.loadingCtrl.dismiss();
        if(res.data === "Username and Password Combination not Found!") {
          loginPage.presentAlert(res.data);
        }
        else {
          // form.reset();
          this.storage.set(environment.tokenKeyStorage.userid, res.data).then(() => {
            loginPage.router.navigateByUrl('/mainmenu');
          })
        }
      })
    }
  }

  // presentLoading(stringLoading) {
  //   console.log("mulai present")
  //   this.loadingCtrl.create({
  //     keyboardClose: true,
  //     message: stringLoading
  //   })
  //   .then(loadingEl => {
  //     loadingEl.present();
  //   })
  //   console.log("selesai present")
  // }

  async presentAlert(stringNotification) {
    const alertFailed = await this.alertController.create({
      header: "",
      message: stringNotification,
      buttons: ["OK"]
    });

    await alertFailed.present();
  }
}