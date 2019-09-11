import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeolocationOptions, Geoposition, Geolocation } from '@ionic-native/geolocation/ngx';
import { FoodApiPage } from '../../../search/food-api/food-api.page';
import { FoodService } from 'src/app/services/food.service';
import { ReviewService } from 'src/app/services/review.service';
// import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

declare const naver;
declare const google;


@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})
export class FoodPage implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  address:string;


  reviewForm: FormGroup;
  options : GeolocationOptions;
  place : Geoposition;
  food: Object;
  searchPlace
  country: string;
  searchResult;

  reviewbookId: string = null;
  reviewId: string = null;
  titleText: string = '새 리뷰 작성';
  
  nMap
  marker


  constructor(private modalController: ModalController,private router: Router, private geolocation: Geolocation,
    private foodService: FoodService, private activatedRoute: ActivatedRoute, private plt: Platform, private reviewService: ReviewService) {

     }

  ngOnInit() {
    this.reviewForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
      phoneNumber: new FormControl(''),
      typeOfFood: new FormControl(''),
      roadAddress: new FormControl(''),
      eatDate: new FormControl(''),
      food_picture: new FormControl(''),
      evaluation: new FormControl(''),
      tags: new FormControl(''),
      reviewbook: new FormControl(''),
      country: new FormControl(''),
      x: new FormControl(''),
      y: new FormControl('')
    })

    this.plt.ready().then(() => {
      this.loadMap();
    })

    this.reviewbookId = this.activatedRoute.snapshot.paramMap.get('reviewbook_id');
    this.reviewId = this.activatedRoute.snapshot.paramMap.get('review_id');
    
     // 새 리뷰 작성 시 필요한 reviewbook_id
     console.log('food write page로 넘어온 reviewbook_id : ' + this.reviewbookId);

     // 리뷰 수정 시 detail 로딩 및 title 설정
     if (this.reviewId !== null) {
       this.loadDetail();
       this.titleText = "리뷰 수정";
     }
    
  }

  loadMap() {
    let geolocationOptions = {
      enableHighAccuracy: true
    }
    this.geolocation.getCurrentPosition(geolocationOptions).then((resp) => {
      if(this.country === 'oversea'){
        let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        let mapOptions = {
    
          center: latLng,
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
        let latLng = new naver.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        let mapOptions = {
          
          center: latLng,
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

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }


  // ngAfterViewInit() {
  //   this.nMap = new naver.maps.Map('naverMap');
  //   this.mapInit();
  // }

  onSubmit() {

    // reviewbook Formcontrol value 설정
    this.reviewForm.controls['reviewbook'].setValue(this.reviewbookId, { onlyself: true });

    // 새 리뷰 작성 시
    if (this.reviewId === null) {
      this.reviewService.writeReview('food', this.reviewForm.value).subscribe(res => {
        console.log("입력한 reviewForm : ", this.reviewForm);
        console.log("새 리뷰 등록 결과 : ", res);
        // 리뷰북 페이지로 이동
        this.router.navigate(['food/list', this.reviewbookId]);
      })
    }

    //리뷰 수정 시
    else {
      this.reviewService.editReview('food', this.reviewId, this.reviewForm.value).subscribe(res => {
        console.log("입력한 reviewForm : ", this.reviewForm);
        console.log("리뷰 수정 등록 결과 : ", res);
        // 리뷰 디테일 페이지로 이동
        this.router.navigate(['food/detail', this.reviewId]);
      })
    }
  }

    // 리뷰 수정 시 디테일 가져오기
    loadDetail() {
      this.reviewService.getReviewDetail('food', this.reviewId).subscribe(data => {
        console.log('reviewService 요청할 때 reivew_id : ', this.reviewId);
        console.log('받아온 Review data', data);
        this.food = data;
        this.reviewbookId = data['reviewbook'];
        console.log("!!! loadDetail !!!");
        console.log(this.reviewbookId);
      })
    }


  async openSearchFoodModal(){
    const modal = await this.modalController.create({
      component: FoodApiPage,
    });
    modal.onDidDismiss()
    .then((data) => {
      this.searchResult = data['data'];
      if(this.country === 'oversea'){
        this.searchPlace = new google.maps.LatLng(this.searchResult.y, this.searchResult.x);
      }else {
        this.searchPlace = new naver.maps.LatLng(this.searchResult.y, this.searchResult.x);
      }
      this.reviewForm.controls['x'].setValue(this.searchResult.x, {onlyself: true});
      this.reviewForm.controls['y'].setValue(this.searchResult.y, {onlyself: true});
      this.marker.setPosition(this.searchPlace);
      this.map.setCenter(this.searchPlace);
      
    })
    return await modal.present(); 
  };

  // naverMap(place: Geoposition) {
  //   let current = new naver.maps.LatLng(place.coords.latitude, place.coords.longitude);
  //   this.nMarker = new naver.maps.Marker({
  //     map: this.nMap,
  //     position: current
  //   });
  //   this.nMap.setCenter(current);
  // }

  // googleMap(place: Geoposition){
  //   let current = {
  //     lat: place.coords.latitude, lng: place.coords.longitude
  //   }
  //   this.gMap = new google.maps.Map(document.getElementById('googleMap'), {
  //     center: current,
  //     zoom: 15
  //   });
  //   this.gMarker = new google.maps.Marker({position: current, map: this.gMap});
  // }

  // getCurrentPlace() {
  //   let options = {
  //     enableHighAccuracy : true
  //   }
  //   return this.geolocation.getCurrentPosition(options);
  // }

  // mapInit(){
  //   this.getCurrentPlace().then((resp) => {
  //     this.naverMap(resp);
  //     // this.googleMap(resp);
  //   }).catch((err) => {
  //     console.log(err);
  //   })
  //   // this.options = {
  //   //   enableHighAccuracy : true
  //   // };
  //   // this.geolocation.getCurrentPosition(this.options).then((resp) => {
  //   //   this.place = resp;
  //   //   var current = new naver.maps.LatLng(resp.coords.latitude, resp.coords.longitude)
  //   //   this.marker = new naver.maps.Marker({
  //   //     map: this.Nmap,
  //   //     position: current
  //   //   })
  //   //   this.Nmap.setCenter(current);
  //   //   console.log(this.marker);
  //   // })
  // }

  segmentChanged(ev: any){
    console.log('Segment button clicked', ev);
    this.country = ev.detail.value;
    this.reviewForm.controls['country'].setValue(ev.detail.value, {onlyself: true});
    this.loadMap();
  }
}
