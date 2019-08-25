import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReviewbookService {

  url = environment.url;

  constructor(private http: HttpClient, private router: Router,
    public alertController: AlertController, public toastController: ToastController) { }

  /**
   * get reviewBooks list
   * @param category 
   * @return {Observable} results with information about reviewbook
   */

  getReviewBookList(category: string) {
    return this.http.get(`${this.url}/api/reviewbook/${category}`).pipe(
      map(results => {
        console.log(results);
        return results;
      }),
      catchError(e => {
        let status = e.status;
        if (status === 404) {
          console.log('404 err : ', e.error.msg);
          // this.showAlert('리뷰북이 없습니다. 생성하시겠습니까?', '');
          return of([]);
        }
        throw new Error(e);
      })
    )
  }


  //새 리뷰북 작성
  createReviewbook(data) {
    return this.http.post(`${this.url}/api/reviewbook`, data)
      .pipe(
        tap(res => {
          this.presentToast('새로운 리뷰북이 추가되었습니다.');
        })
        // catchError(e => {
        //   this.showAlert(e.error.msg, '오류');
        //   throw new Error(e);
        // })
      )
  };


  // 리뷰북 삭제
  deleteReviewBook(id) {
    return this.http.delete(`${this.url}/api/reviewbook/${id}`)
      .pipe(
        tap(res => {
          this.presentToast('리뷰북이 삭제되었습니다.');
        }),
        catchError(e => {
          this.showAlert(e.error.msg, '오류');
          throw new Error(e);
        })
      )
  }
  //Alert창 생성 메소드
  showAlert(msg, title) {
    let alert = this.alertController.create({
      message: msg,
      header: title,
      buttons: ['확인']
    });
    alert.then(alert => alert.present());
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
