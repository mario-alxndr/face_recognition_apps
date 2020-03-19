import { Component, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { environment } from "../../environments/environment";

import * as moment from 'moment';
import axios from "axios";

@Component({
  selector: 'app-log',
  templateUrl: './log.page.html',
  styleUrls: ['./log.page.scss'],
})
export class LogPage implements OnInit {
  logs: any;

  constructor(
    private router: Router,
    public alertController: AlertController,
    private storage: Storage
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.storage.get(environment.tokenKeyStorage.userid).then(res => {
      if(!res) {
        this.router.navigateByUrl('/login');
      }
      else {
        let data = { user_id : res };

        axios({
          method: "post",
          url: environment.endPointConstant.absenlistEndPoint,
          headers: {
            "Content-Type": "application/json",
            "Allow-Control-Allow-Origin": "127.0.0.1:5000",
            // "Access-Control-Allow-Methods":
            // "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
          },
          data
        })
        .then(response => {
          this.logs = response.data;
        })
        .catch(error => {
          alert(error);
        })
      }
    })
  }
}
