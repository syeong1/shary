import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { ReviewService } from 'src/app/services/review.service';

const colors = ["primary", "secondary", "tertiary", "success", "warning", "danger"];

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {
  
  reviewId: string;
  review= null;

  constructor(private alertController: AlertController,private activatedRoute: ActivatedRoute,private movieService: MovieService,private reviewService: ReviewService,private router: Router) { }

  ngOnInit() {
    this.reviewId = this.activatedRoute.snapshot.paramMap.get('id');
  }
  ionViewWillEnter() {
    this.getReviewDetail();
  }
  getReviewDetail() {
    this.reviewService.getReviewDetail('movie', this.reviewId).subscribe(data => {
      console.log('*** reviewService.getReviewDetail 요청 때 reviewid : ', this.reviewId);
      console.log('받아온 Review data', data);
      this.review = data;
    })
  }
  editReview() {
    this.router.navigate(['movie/edit', this.reviewId]);
  }



  async deleteReview(){
    const alert = await this.alertController.create({
      header: '리뷰 삭제',
      message: '삭제하시겠습니까?',
      buttons: [
        {
          text: '취소',
          role: 'cancel',
          handler: () => {
            console.log('삭제 취소');
          }
        }, {
          text: '확인',
          handler: () => {
            console.log('삭제 확인');
            this.reviewService.deleteReview('movie', this.reviewId).subscribe(data => {
              // 이동할 리뷰북 리스트 아이디
              let reviewbookId = data['reviewbook']
              this.router.navigate(['movie/list', reviewbookId]);
            })
          }
        }
      ]
    });

    await alert.present();
  }

  async shareReview(){
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
