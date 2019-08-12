import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  loginState: boolean;

  constructor(private authService: AuthService, private alertController: AlertController) { }

  ngOnInit() {
    this.loginState = this.authService.isAuthenticated();
  }
  ngDoCheck() {
    this.loginState = this.authService.isAuthenticated();
  }


  logout() {

    let alert = this.alertController.create({
      header: '',
      message: '로그아웃하시겠습니까',
      buttons: [
        {
          text: '취소',
          handler: () => {
            console.log('취소');
          }
        }, {
          text: '확인',
          handler: () => {
            console.log('확인');
            this.authService.logout();
            this.loginState = false;
          }
        }
      ]
    });
    alert.then(alert => alert.present());
  }
}