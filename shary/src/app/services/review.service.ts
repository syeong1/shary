import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  url = environment.url;

  constructor(private http: HttpClient, private alertController: AlertController, public toastController: ToastController) { }


  // 리뷰 리스트 가져오기
  getReviewList(category: string, reviewbookId: string) {
    return this.http.get(`${this.url}/api/review/${category}/${reviewbookId}`).pipe(
      catchError(e => {
        let status = e.status;
        if (status === 404) {
          // this.showAlert('리뷰가 없습니다.', '오류');
        }
        throw new Error(e);
      })
    )
  }

  // 리뷰 디테일 가져오기
  getReviewDetail(category: string, reviewId: string) {
    return this.http.get(`${this.url}/api/review/${category}/detail/${reviewId}`).pipe(
      catchError(e => {
        let status = e.status;
        if (status === 404) {
          // this.showAlert('리뷰가 없습니다.', '오류');
        }
        throw new Error(e);
      })
    )
  }


  // 새 리뷰 등록하기
  writeReview(category: string, data: FormData) {
    return this.http.post(`${this.url}/api/review/${category}`, data).pipe(
      tap(res => {
        this.presentToast('리뷰가 등록되었습니다.');
      }),
      catchError(e => {
        this.showAlert(e.error.msg, '오류');
        throw new Error(e);
      })
    );
  }


  // 리뷰 수정하기
  editReview(category: string, reviewId: string, data: FormData) {
    return this.http
      .patch(`${this.url}/api/review/${category}/${reviewId}`, data).pipe(
        tap(res => {
          this.presentToast('리뷰가 수정되었습니다.');
        }),
        catchError(e => {
          this.showAlert(e.error.msg, '오류');
          throw new Error(e);
        })
      );
  }


  // 리뷰 삭제하기
  deleteReview(category: string, reviewId: string) {
    return this.http
      .delete(`${this.url}/api/review/${category}/${reviewId}`).pipe(
        tap(res => {
          this.presentToast('리뷰가 삭제되었습니다.');
        }),
        catchError(e => {
          this.showAlert(e.error.msg, '오류');
          throw new Error(e);
        })
      );
  }

  // Toast 창
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  showAlert(msg, title) {
    let alert = this.alertController.create({
      message: msg,
      header: title,
      buttons: ['확인']
    });
    alert.then(alert => alert.present());
  };
}
