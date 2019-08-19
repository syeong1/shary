import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ReviewbookService } from 'src/app/services/reviewbook.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  category: string;
  reviewbookForm: FormGroup;


  constructor(private route: ActivatedRoute, private router: Router, private reviewbookService: ReviewbookService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.category = this.router.getCurrentNavigation().extras.state.category;
      }
    })
  }

  ngOnInit() {
    this.reviewbookForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      category: new FormControl('')
    })
  }

  onSubmit() {
    this.reviewbookService.createReviewBook(this.reviewbookForm.value).subscribe((res) => {
      console.log(this.reviewbookForm);
      this.router.navigate(['']);
    })
  }
}
