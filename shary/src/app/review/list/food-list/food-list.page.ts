import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.page.html',
  styleUrls: ['./food-list.page.scss'],
})
export class FoodListPage implements OnInit {

  reviewId;
  reviews;

  constructor(private foodService: FoodService, private activatedRoute: ActivatedRoute, private router: Router) { 
    this.activatedRoute.params.subscribe(params => {
      this.reviewId = params['id'];
      this.foodService.getFoodReviewList(this.reviewId).subscribe(data => {
        console.log('food list에 받아온 data', data);
        this.reviews = data;
      })
      console.log(`가져온 리뷰 리스트 id : ${this.reviewId}`);
      console.log(`reviews : ${this.reviews}`);
      });
  }

  ngOnInit() {
  }

  openWritePage(){
    this.router.navigate(['/food', this.reviewId]);
  }

}
