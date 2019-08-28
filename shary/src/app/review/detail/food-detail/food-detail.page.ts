import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { ReviewService } from 'src/app/services/review.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.page.html',
  styleUrls: ['./food-detail.page.scss'],
})
export class FoodDetailPage implements OnInit {

  reviewId;

  data;

  constructor(private activatedRoute: ActivatedRoute, private reviewService: ReviewService,
    private router: Router, private alertController: AlertController) {  }

  ngOnInit() {
    this.reviewId = this.activatedRoute.snapshot.params['id'];
  }

  ionViewWillEnter() {
    this.getReviewDetail();
  }

  getReviewDetail() {
    this.reviewService.getReviewDetail('food', this.reviewId).subscribe(data => {
      console.log('*** reviewService.getReviewDetail 요청 때 reviewid : ', this.reviewId);
      console.log('받아온 Review data', data);
      this.data = data;
    })
  }


  async deleteReview() {
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
            this.reviewService.deleteReview('book', this.reviewId).subscribe(data => {
              // 이동할 리뷰북 리스트 아이디
              let reviewbookId = data['reviewbook']
              this.router.navigate(['book/list', reviewbookId]);
            })
          }
        }
      ]
    });

    await alert.present();
  }

  editReview() {
    this.router.navigate(['food/edit', this.reviewId]);
  }

}
