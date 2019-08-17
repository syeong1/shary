import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment'
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient, private alertController: AlertController) { }

  

  /**
   * write a review about food
   * @param {formData} formData
   * @return response with res
   */
  writeReview(data) {
    return this.http.post(`http://172.30.1.28:5000/api/review/food/write`, data)
      .pipe(
        tap(res => {
          this.showAlert('정상적으로 저장되었습니다.', '성공');
        })
        // catchError(e => {
        //   this.showAlert(e.error.msg, '오류');
        //   throw new Error(e);
        // })
      )
  };

  /**
   * get food review myList
   * @return my FoodList
   */
  getreviewBook() {
    return this.http.get(`http://172.30.1.28:5000/api/review/food`).pipe(

      catchError(e => {
        let status = e.status;
        if (status === 401) {
          this.showAlert('오류', '리스트 불러오기 실패');
        }
        throw new Error(e);
      })
    );
  }

    //Alert창 생성 메소드
    showAlert(msg, title) {
      let alert = this.alertController.create({
        message: msg,
        header: title,
        buttons: ['확인']
      });
      alert.then(alert => alert.present());
    };
}
