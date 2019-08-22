import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ReviewbookService } from 'src/app/services/reviewbook.service';
import { ModalController, NavParams } from '@ionic/angular';


@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  @Input("category") category;
  reviewbookForm: FormGroup;


  constructor(public navParams: NavParams, private route: ActivatedRoute, private router: Router, private reviewbookService: ReviewbookService, private modalController: ModalController) {
  }

  ngOnInit() {
    this.reviewbookForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      category: new FormControl('')
    })
  }

  onSubmit() {
    this.reviewbookService.createReviewBook(this.reviewbookForm.value).subscribe(res => {
      console.log(this.reviewbookForm);
      console.log(res);
      this.back();
    })
  }

  back() {
    this.modalController.dismiss();
  }
}
