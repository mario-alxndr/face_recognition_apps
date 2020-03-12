import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import axios from 'axios';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    // private router: Router,
    public alertController: AlertController,
    // private storage: Storage,
  ) { }

  ngOnInit() {

  }

  async onLogin(form) {
    let stringNotification = '';
    let loginSuccess = false;
    let counter = 0;
    let loginPage = this;

    

    if(!form.value.user_name || !form.value.password) {
      stringNotification += " Please enter your ";
      if(!form.value.user_name) {
        stringNotification += "username";
        counter++;
      } 
      if(!form.value.password) {
        if(counter>0) {
          stringNotification += " & ";
        }
        stringNotification += "password";
        counter++;
      }
      loginPage.presentAlert(stringNotification);
    }
    else {
      // let data =  {
      //   'user_name': form.value.user_name,
      //   'password': form.value.password
      // };
      
      // const loginStatus = this.hitLogin(data);
      // console.log(loginStatus);
      var bodyFormData = new FormData();
      
      bodyFormData.append('user_name',  form.value.user_name);
      bodyFormData.append('password',  form.value.password);

      axios({
        method: 'post',
        url: environment.endPointConstant.loginEndPoint,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Allow-Control-Allow-Origin": "127.0.0.1:5000",
          "Access-Control-Allow-Methods":
            "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        },
        withCredentials: true,
        data: {
          // bodyFormData
          "user_name": form.value.user_name,
          "password": form.value.password
        }
      })
      // console.log(environment.endPointConstant.loginEndPoint + '?user_name=' + form.value.user_name + '&password=' + form.value.password);
      // axios({
      //   method: 'post',
      //   url: environment.endPointConstant.loginEndPoint + '?user_name=' + form.value.user_name + '&password=' + form.value.password,
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded",
      //     "Allow-Control-Allow-Origin": "127.0.0.1:5000",
      //     "Access-Control-Allow-Methods":
      //       "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      //     "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
      //   },
      //   withCredentials: true,
      // })
      // .then(res => {
      //   console.log(res);
      // })
    }
  }

  // hitLogin = async(data) => {
  //   const res = await axios.post(environment.endPointConstant.loginEndPoint, JSON.stringify(data), {
  //     headers: {
  //         "Content-Type": "application/json",
  //         "Allow-Control-Allow-Origin": "*",
  //         "Access-Control-Allow-Methods":
  //           "GET, POST, PATCH, PUT, DELETE, OPTIONS",
  //         "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
  //       },
  //   })

  //   return res.data;
  // }

  async presentAlert(stringNotification) {
    const alertFailed = await this.alertController.create({
      header: 'Error',
      message: stringNotification,
      buttons: ['OK']
    });

    await alertFailed.present();
  }
}
