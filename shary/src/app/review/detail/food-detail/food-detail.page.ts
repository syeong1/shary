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
     
  }

  getReviewDetail() {
    this.reviewService.getReviewDetail('food', this.reviewId).subscribe(data => {
      console.log('*** reviewService.getReviewDetail 요청 때 reviewid : ', this.reviewId);
      console.log('받아온 Review data', data);
      this.data = data;
      let stringData = JSON.stringify(data);
      let jsonData = JSON.parse(stringData);
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
}
