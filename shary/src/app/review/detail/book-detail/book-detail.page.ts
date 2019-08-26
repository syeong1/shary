import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReviewService } from 'src/app/services/review.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.page.html',
  styleUrls: ['./book-detail.page.scss'],
})
export class BookDetailPage implements OnInit {

  reviewId: string;
  data = null;

  constructor(private reviewService: ReviewService, private activatedRoute: ActivatedRoute, private router: Router, public alertController: AlertController) { }

  ngOnInit() {
    this.reviewId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('책 리뷰북 id : ', this.reviewId);
  }

  ionViewWillEnter() {
    this.getReviewDetail();
  }

  getReviewDetail() {
    this.reviewService.getReviewDetail('book', this.reviewId).subscribe(data => {
      console.log('*** reviewService.getReviewDetail 요청 때 reviewid : ', this.reviewId);
      console.log('받아온 Review data', data);
      this.data = data;
    })
  }

  editReview() {
    this.router.navigate(['book/edit', this.reviewId]);
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
}
