import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ReviewbookService } from 'src/app/services/reviewbook.service';
import { CreatePage } from './../create/create.page';
import { ModalController } from '@ionic/angular';



@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  category: string;
  category_kr: string;
  reviewbooks;

  constructor(private route: ActivatedRoute, private router: Router, private reviewbookService: ReviewbookService, private modalController: ModalController) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.category = this.router.getCurrentNavigation().extras.state.category;
        this.category_kr = this.router.getCurrentNavigation().extras.state.text;
        console.log('extras.state.category : ' + this.category);
        this.getReviewbooks();
      }
    })
  }

  ngOnInit() {
  }


  getReviewbooks() {
    this.reviewbookService.getReviewBookList(this.category).subscribe(data => {
      console.log('*** reviewbookService.getReviewBookList 요청할 때 category : ', this.category);
      console.log('받아온 리뷰북리스트 data', data);
      this.reviewbooks = data;
    })
  }

  goToReviewbookPage(reviewbook) {
    let navigationExtras: NavigationExtras = {
      state: {
        title: reviewbook.title
      }
    };
    this.router.navigate([reviewbook.category, 'list', reviewbook._id], navigationExtras);
  }


  async openCreatePageModal() {
    const modal = await this.modalController.create({
      component: CreatePage,
      componentProps: { category: this.category }
    })

    // 모달창 닫힐 때 리뷰북리스트 다시 가져옴
    modal.onDidDismiss().then(() => {
      this.getReviewbooks();
    });

    return await modal.present();
  };


}
