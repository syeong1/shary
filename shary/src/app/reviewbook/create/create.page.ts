import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  category: any;
  reviewForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private foodService: FoodService) {
    this.route.queryParams.subscribe(params => {
      // console.log(this.router.getCurrentNavigation().extras.state);
      if (this.router.getCurrentNavigation().extras.state) {
        this.category = this.router.getCurrentNavigation().extras.state.category;
        console.log('넘어온 카테고리 : ' + this.category);
      }
    })
  }

  ngOnInit() {
    this.reviewForm = new FormGroup({
      title: new FormControl('',[Validators.required]),
      type: new FormControl('', [Validators.required])
    })
  }

  onSubmit() {
    this.foodService.writeReviewBook(this.reviewForm.value).subscribe((res) => {
      console.log(this.reviewForm);
      this.router.navigate(['reviewbook/list'], this.category);
    })
  }

}
