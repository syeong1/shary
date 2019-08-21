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
  titleText: string;
  reviewbooks;

  constructor(private route: ActivatedRoute, private router: Router, private reviewbookService: ReviewbookService, private modalController: ModalController) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.category = this.router.getCurrentNavigation().extras.state.category;
        this.titleText = this.router.getCurrentNavigation().extras.state.text;
        console.log('넘어온 카테고리 : ' + this.category);
        this.getReviewbooks();
      }
    })
  }

  ngOnInit() {
  }

  getReviewbooks() {
    this.reviewbookService.getReviewBookList(this.category).subscribe(data => {
      console.log('Service 요청할 때 카테고리 : ', this.category);
      console.log('받아온 data', data);
      this.reviewbooks = data;
    })
  }
  
  async openCreatePageModal() {
    const modal = await this.modalController.create({
      component: CreatePage,
      componentProps: { category: this.category }
    })

    modal.onDidDismiss().then(() => {
      this.getReviewbooks();
   });
   
    return await modal.present();
  };


}
