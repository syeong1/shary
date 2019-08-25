import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.page.html',
  styleUrls: ['./food-detail.page.scss'],
})
export class FoodDetailPage implements OnInit {

  reviewId;

  details;

  constructor(private activatedRoute: ActivatedRoute, private foodService: FoodService) {  }

  ngOnInit() {
    this.reviewId = this.activatedRoute.snapshot.params['id'];
    this.getReviewDetail(this.reviewId);
  }


  /**
   * 리뷰 정보 가져오기
   * @param reviewId 
   */
  getReviewDetail(reviewId) {
    this.foodService.getReviewDetail(reviewId).subscribe(data => {
      console.log(data);
      this.details = data;
    })
  }

}
