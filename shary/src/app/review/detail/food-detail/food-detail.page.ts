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
  }

  

}
