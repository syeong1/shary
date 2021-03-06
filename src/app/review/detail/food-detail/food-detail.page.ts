import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from 'src/app/services/review.service';
import { AlertController, Platform } from '@ionic/angular';


declare const naver;
declare const google;
@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.page.html',
  styleUrls: ['./food-detail.page.scss'],
})
export class FoodDetailPage implements OnInit, AfterViewInit {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  marker;

  reviewId: string;
  data = null;
  eatDate;

  likeState: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private reviewService: ReviewService,
    private router: Router, private alertController: AlertController) {  }

  ngOnInit() {
    this.reviewId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('맛집 리뷰 id : ', this.reviewId);
    
  }

   ionViewWillEnter() {
    this.getReviewDetail();
  }

  ngAfterViewInit() {
    this.getReviewDetail();
    this.getLike();
  }

  getReviewDetail() {
    this.reviewService.getReviewDetail('food', this.reviewId).subscribe(data => {
      console.log('*** reviewService.getReviewDetail 요청 때 reviewid : ', this.reviewId);
      console.log('받아온 Review data', data);
      this.data = data;
      // JSON.stringify(data['eatDate']).s;
      let stringData = JSON.stringify(data);
      let jsonData = JSON.parse(stringData);
      if(jsonData.eatDate === null){
        this.eatDate = '등록되어 있지 않음';
      }else{
        this.eatDate = (String)(jsonData.eatDate).substring(0,10); 
      }
      
      console.log('jsonData', jsonData);
      this.MapInit(jsonData.country, jsonData.x, jsonData.y); 
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
            this.reviewService.deleteReview('food', this.reviewId).subscribe(data => {
              // 이동할 리뷰북 리스트 아이디
              let reviewbookId = data['reviewbook']
              this.router.navigate(['food/list', reviewbookId]);
            })
          }
        }
      ]
    });

    await alert.present();
  }

  editReview() {
    console.log('edit페이지로 넘어갈 reviewid', this.reviewId);
    this.router.navigate(['food/edit', this.reviewId]);
  }

//   markMap(country, x, y){
//     if(country === 'oversea'){
//       let latLng = new google.maps.LatLng(y, x);
//       this.marker = new google.maps.Marker({
//           map: this.map,
//           position: latLng
//         })
//         this.map.setCenter(latLng);
//     }else{
      
//       this.marker = new naver.maps.Marker({
//           map: this.map,
//           position: latLng
//         })
//         this.map.setCenter(latLng);
//   }
// }

  
  MapInit(country, x, y) {
      if(country === 'oversea'){
        let latLng = new google.maps.LatLng(y, x);
        let mapOptions = {
          latLng: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.marker = new google.maps.Marker({
          map: this.map,
          position: latLng
        })
        this.map.setCenter(latLng);
      }else{
        let latLng = new naver.maps.LatLng(y, x);
        let mapOptions = {
          latLng: latLng,
          zoom: 10
        }
        this.map = new naver.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.marker = new naver.maps.Marker({
          map: this.map,
          position: latLng
        })
        this.map.setCenter(latLng);
      }

      // let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      // let current = new naver.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      // let mapOptions = {
      //   center: latLng,
      //   zoom: 15,
      //   mapTypeId: google.maps.MapTypeId.ROADMAP
      // }

      // this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

      // this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

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


    SearchTag(item) {
      console.log('검색할 태그', item); 
      this.router.navigate(['main-tabs/search/tag', item]);
    }
}
