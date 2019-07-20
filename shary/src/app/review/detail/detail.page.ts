import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  tags = ["뮤지컬","윌 스미스","디즈니","알라딘","추억","영화","굿"];

  colors = ["primary","secondary","tertiary","success","warning","danger"];

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  async openDeleteAlert(){
    const alert = await this.alertController.create({
      header: '리뷰 삭제',
      message: '리뷰를 정말로 삭제할까요?',
      buttons: ['취소', '삭제']
    });

    await alert.present();
  }

  async openShareAlert(){
    const alert = await this.alertController.create({
      header:'공유하기',
      message: '스포일러 주의! 공유내용에 감상평을 포함할까요?',
      buttons:[
        {
          text:'포함하기',
          handler: () =>{
            console.log('포함하기')
          }
        },
        {
          text:'포함하지않기',
          handler: () =>{
            console.log('포함하지 않기')
          }
        },
        {
          text: '취소',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
            console.log('Confirm Cancel: 취소');
          }
        }

      ]
    });
    await alert.present();
  }

}
