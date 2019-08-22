import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
=======
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
>>>>>>> c0734476a3a8b435418f8cd7441a0c72115efd32

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.page.html',
  styleUrls: ['./food-detail.page.scss'],
})
export class FoodDetailPage implements OnInit {

<<<<<<< HEAD
  constructor() { }
=======
  details;

  constructor(private activatedRoute: ActivatedRoute, private foodService: FoodService) { 
    this.activatedRoute.params.subscribe(params => {
      this.foodService.getReviewDetail(params['id']).subscribe(data => {
        console.log('food list에 받아온 data', data);
        this.details = data;
      })
      console.log(`가져온 리뷰 id : ${params['id']}`);
      console.log(`details : ${this.details}`);
      });
  }
>>>>>>> c0734476a3a8b435418f8cd7441a0c72115efd32

  ngOnInit() {
  }

}
