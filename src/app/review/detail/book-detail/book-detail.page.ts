import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReviewService } from 'src/app/services/review.service';
import { AlertController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.page.html',
  styleUrls: ['./book-detail.page.scss'],
})
export class BookDetailPage implements OnInit {

  reviewId: string;
  data = null;
  likeState: boolean = false;

  constructor(private reviewService: ReviewService, private activatedRoute: ActivatedRoute, private router: Router, public alertController: AlertController, private socialSharing: SocialSharing) { }

  ngOnInit() {
    this.reviewId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('책 리뷰북 id : ', this.reviewId);
  }

  ionViewWillEnter() {
    this.getReviewDetail();
    this.getLike();
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

  getLike() {
    this.reviewService.getLike(this.reviewId).subscribe(result => {
      console.log('좋아요 상태', result);
      this.likeState = result['like'];
    })
  }

  addLike() {
    this.reviewService.addLike(this.reviewId).subscribe(data => {
      console.log('좋아요 누른 결과', data);
      this.likeState = true;
    })
  }
  cancelLike() {
    this.reviewService.cancelLike(this.reviewId).subscribe(data => {
      console.log('좋아요 취소 결과', data);
      this.likeState = false;
    })
  }

  searchTag(item) {
    console.log('검색할 태그', item);
    this.router.navigate(['main-tabs/search/tag', item]);
  }

  async shareReview() {
    const alert = await this.alertController.create({
      header: '공유하기',
      message: '스포일러 주의! 공유내용에 감상평을 포함할까요?',
      buttons: [
        {
          text: '포함하기',
          handler: () => {
            this.socialShare(`< ${this.data.title} > \r\n\r\n ★ ${this.data.rating}.0\r\n\r\n\r\n :: 줄거리 ::\r\n ${this.data.description}\r\n\r\n\r\n:: 감상평 ::\r\n ${this.data.review}`, `${this.data.image}`);
          }
        },
        {
          text: '포함하지 않기',
          handler: () => {
            this.socialShare(`<< ${this.data.title} > \r\n\r\n ★ ${this.data.rating}.0\r\n\r\n\r\n :: 줄거리 ::\r\n ${this.data.description}`, `${this.data.image}`);
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

  socialShare(message, image) {
    this.socialSharing.share(message, null, [image]).then((res) => {
      console.log('res', res);
    }).catch(e => {
      console.log('e', e);
    })
  }
}