import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ReviewbookService } from 'src/app/services/reviewbook.service';
import { CreatePage } from './../create/create.page';
import { ModalController, AlertController } from '@ionic/angular';



@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  category: string;
  category_kr: string;
  reviewbooks;
  editState = false;

  constructor(private route: ActivatedRoute, private router: Router, private reviewbookService: ReviewbookService, private modalController: ModalController, public alertController: AlertController) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.category = this.router.getCurrentNavigation().extras.state.category;
        this.category_kr = this.router.getCurrentNavigation().extras.state.text;
        console.log('extras.state.category : ' + this.category);
        this.getAllReviewbookList();
      }
    })
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getAllReviewbookList();
  }

  editList(state) {
    if (state == false) this.editState = true;
    else this.editState = false;
  }

  // 리뷰북 전체 리스트 가져오기
  getAllReviewbookList() {
    this.reviewbookService.getAllReviewbookList(this.category).subscribe(data => {
      console.log('*** reviewbookService.getReviewBookList 요청할 때 category : ', this.category);
      console.log('받아온 리뷰북리스트 data', data);
      this.reviewbooks = data;
    })
  }


  // 클릭한 리뷰북으로 이동
  goToReviewbookPage(reviewbook) {
    let navigationExtras: NavigationExtras = {
      state: {
        title: reviewbook.title
      }
    };
    this.router.navigate([reviewbook.category, 'list', reviewbook._id], navigationExtras);
  }

  // 리뷰북 삭제
  async deleteReviewbook(id) {
    const alert = await this.alertController.create({
      header: '리뷰북 삭제',
      message: '삭제하시겠습니까?',
      buttons: [
        {
          text: '취소',
          role: 'cancel',
          handler: () => {
            console.log('삭제 취소');
          }
        }, {
          text: '확인',
          handler: () => {
            console.log('삭제 확인');
            this.reviewbookService.deleteReviewBook(id).subscribe(data => {
              console.log('*** reviewbookService.deleteReviewBook 요청할 때 id : ', id);
              console.log('삭제된 리뷰북', data);
              this.getAllReviewbookList();
            })
          }
        }
      ]
    });
    await alert.present();
  }

  // 리뷰북 생성 모달 
  async openCreateReviewbookModal() {
    let modal = await this.modalController.create({
      component: CreatePage,
      componentProps: { category: this.category }
    })

    // 모달창 닫힐 때 리뷰북리스트 다시 가져옴
    modal.onDidDismiss().then(() => {
      this.getAllReviewbookList();
    });

    return await modal.present();
  };


  // 리뷰북 수정 모달 
  async openEditReviewbookModal(reviewbook) {
    let modal = await this.modalController.create({
      component: CreatePage,
      componentProps: { category: this.category, title: reviewbook.title, id: reviewbook._id, num: reviewbook.color }
    })

    // 모달창 닫힐 때 리뷰북리스트 다시 가져옴
    modal.onDidDismiss().then(() => {
      this.getAllReviewbookList();
    });

    return await modal.present();
  };
}
