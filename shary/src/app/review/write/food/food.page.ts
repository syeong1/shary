import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeolocationOptions, Geoposition, Geolocation } from '@ionic-native/geolocation/ngx';
import { FoodApiPage } from '../../../search/food-api/food-api.page';
import { FoodService } from 'src/app/services/food.service';
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
  food = null;
  searchPlace
  reviewId: string;
  country: string;
  
  nMap
  marker


  constructor(private modalController: ModalController,private router: Router, private geolocation: Geolocation,
    private foodService: FoodService, private activatedRoute: ActivatedRoute) {

     }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.reviewId = params['id'];
      console.log('food write page로 넘어온 리뷰북 아이디 : ' + this.reviewId);
      this.reviewForm.controls['reviewbook'].setValue(this.reviewId, {onlyself: true});
    });
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
      country: new FormControl('')
    })

    this.loadMap();
    
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
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
    this.foodService.writeReview(this.reviewForm.value).subscribe((res) => {
      console.log(this.reviewForm);
      this.router.navigate(['']);
    })
  }


  async openSearchFoodModal(){
    const modal = await this.modalController.create({
      component: FoodApiPage,
    });
    modal.onDidDismiss()
    .then((data) => {
      this.food = data['data'];
      if(this.country === 'oversea'){
        this.searchPlace = new google.maps.LatLng(this.food.y, this.food.x);
      }else {
        this.searchPlace = new naver.maps.LatLng(this.food.y, this.food.x);
      }
      
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
