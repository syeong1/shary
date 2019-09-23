import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { TvService } from 'src/app/services/tv.service';
import { ReviewService } from 'src/app/services/review.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-tv-detail',
  templateUrl: './tv-detail.page.html',
  styleUrls: ['./tv-detail.page.scss'],
})
export class TvDetailPage implements OnInit {

  reviewId: string;
  review= null;
  likeState: boolean = false;

  constructor(private alertController: AlertController,private activatedRoute: ActivatedRoute,private tvService: TvService,private reviewService: ReviewService,private router: Router,private socialSharing: SocialSharing,) { }

  ngOnInit() {
    this.reviewId = this.activatedRoute.snapshot.paramMap.get('id');
  }
  ionViewWillEnter() {
    this.getReviewDetail();
    this.getLike();
  }
  getReviewDetail() {
    this.reviewService.getReviewDetail('tv', this.reviewId).subscribe(data => {
      console.log('*** reviewService.getReviewDetail 요청 때 reviewid : ', this.reviewId);
      console.log('받아온 Review data', data);
      this.review = data;
    })
  }
  editReview() {
    this.router.navigate(['tv/edit', this.reviewId]);
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
            this.reviewService.deleteReview('tv', this.reviewId).subscribe(data => {
              // 이동할 리뷰북 리스트 아이디
              let reviewbookId = data['reviewbook']
              this.router.navigate(['tv/list', reviewbookId]);
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

  async shareReview(){
    const alert = await this.alertController.create({
      header:'공유하기',
      message: '스포일러 주의! 공유내용에 감상평을 포함할까요?',
      buttons:[
        {
          text:'포함하기',
          handler: () =>{
            this.socialShare(`${this.review.title}\r\n\r\n\r\n${this.review.overview}`, `https://image.tmdb.org/t/p/w500${this.review.poster_path}`);
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

  socialShare(message,image){
    this.socialSharing.share(message,null,[image]).then((res)=>{
      console.log('res',res);
    }).catch(e=>{
      console.log('e',e);
    })
  }
  searchTag(item) {
    console.log('검색할 태그', item); 
    this.router.navigate(['main-tabs/search/tag', item]);
  }

}
