import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeolocationOptions, Geoposition, Geolocation } from '@ionic-native/geolocation/ngx';
import { FoodApiPage } from '../../../search/food-api/food-api.page';
import { FoodService } from 'src/app/services/food.service';

declare const naver;


@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})
export class FoodPage implements OnInit, AfterViewInit {

  reviewForm: FormGroup;
  options : GeolocationOptions;
  place : Geoposition;
  food = null;
  searchPlace: Geoposition;
  
  map;
  marker


  constructor(private modalController: ModalController,private router: Router, private geolocation: Geolocation,
    private foodService: FoodService) { }

  ngOnInit() {
    this.reviewForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
      phoneNumber: new FormControl(''),
      typeOfFood: new FormControl(''),
      roadAddress: new FormControl(''),
      eatDate: new FormControl(''),
      food_picture: new FormControl(''),
      evaluation: new FormControl(''),
      tags: new FormControl('')
    })
    
  }

  ngAfterViewInit() {
    this.map = new naver.maps.Map('Map')
    this.getCurrentPlace();
  }

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
      
      console.log(data['data']);
      console.log(typeof data['data']);

      this.food = data['data'];

      console.log(this.food.x);
      console.log(this.food.y);
      
      var searchP = new naver.maps.LatLng(this.food.y, this.food.x);
      this.marker.setPosition(searchP);
      this.map.setCenter(searchP);
      
    })
    return await modal.present(); 
  };

  // ngAfterViewInit(){
  //   // this.makeMap(this.place);
  // }


  getCurrentPlace(){
    this.options = {
      enableHighAccuracy : true
    };
    this.geolocation.getCurrentPosition(this.options).then((resp) => {
      this.place = resp;
      var current = new naver.maps.LatLng(resp.coords.latitude, resp.coords.longitude)
      this.marker = new naver.maps.Marker({
        map: this.map,
        position: current
      })
      this.map.setCenter(current);
      console.log(this.marker);
    })
  }
}
