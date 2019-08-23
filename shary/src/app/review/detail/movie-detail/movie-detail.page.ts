import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

const colors = ["primary", "secondary", "tertiary", "success", "warning", "danger"];

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {
  
  reviewId: string;
  userId: string;
  review= null;

  constructor(private alertController: AlertController,private activatedRoute: ActivatedRoute,private movieService: MovieService) { }

  ngOnInit() {
    this.reviewId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getReview(this.reviewId)
  }

  getReview(id){
    this.movieService.getDetailReview(id).subscribe(data=>{this.review = data
      console.log(data);
    });
    
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
