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

  num = 0;
  numbers = Array;

  id: string = null;

  // 컬러 아이콘 배열 생성
  numberReturn(length) {
    return new Array(length);
  }

  constructor(public navParams: NavParams, private route: ActivatedRoute, private router: Router, private reviewbookService: ReviewbookService, private modalController: ModalController) {
  }

  ngOnInit() {
    this.reviewbookForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      category: new FormControl(''),
      color: new FormControl('')
    })
  }

  onSubmit() {
    // reviewbook color 값 설정
    this.reviewbookForm.controls['color'].setValue(this.num, { onlyself: true });

    if (this.id == null) {
      // 새로운 리뷰북 생성
      console.log("## 리뷰북 생성")

      this.reviewbookService.createReviewbook(this.reviewbookForm.value).subscribe(res => {
        console.log("보낸 생성 데이터", this.reviewbookForm.value);
        console.log("생성 처리 결과", res);
        this.back();
      });
    } else { 
      // 리뷰북 수정
      console.log("## 리뷰북 수정")
      
      this.reviewbookService.editReviewbook(this.id, this.reviewbookForm.value).subscribe(res => {
        console.log("보낸 수정 데이터", this.reviewbookForm.value);
        console.log("수정 처리 결과", res);
        this.back();
      });

    }
  }

  back() {
    this.modalController.dismiss();
  }

  changeColor(num) {
    this.num = num
  }
}
