import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment'
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient, private alertController: AlertController) { }

  url = environment.url;

  /**
   * write a review about food
   * @param {formGroup} formGroup
   * @return response with message about success or fail
   */
  writeReview(data) {
    return this.http.post(`${this.url}/api/review/food`, data)
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
   * 맛집 리뷰북에 있는 리뷰 가져오기
   * @return {Observable} results
   * 
   */
  getFoodReviewList(reviewbook_id) {
    return this.http.get(`${this.url}/api/review/food/${reviewbook_id}`).pipe(
    catchError(e => {
      let status = e.status;
      if(status === 404) {
        this.showAlert('리스트 불러오기 실패', '오류');
      }
      throw new Error(e);
    })
  )
  }

  /**
   * 맛집 리뷰 디테일 가져오기
   * @param review_id 
   */
  
  getReviewDetail(review_id) {
    return this.http.get(`${this.url}/api/review/food/detail/${review_id}`).pipe(
      catchError(e => {
        let status = e.status;
        if(status === 404) {
          this.showAlert('리스트 불러오기 실패', '오류');
        }
        throw new Error(e);
      })
    )
  }

  /**
   * Get a food reviewBook List
   * @param type
   * @return {Observable} results with food reviewBookList
   */
  getReviewBookList(type) {
    return this.http.get(`${this.url}/reviewbook/food?type=${type}`).pipe(map(results => {
        console.log(results);
        return results['items'];
    }),
      catchError(e => {
        let status = e.status;
        if(status === 404) {
          this.showAlert('리스트 불러오기 실패', '오류');
        }
        throw new Error(e);
      })
    )
  }

  /**
   * Write ReviewBook(food)
   * @param data with title, type 
   * @return {Observable} result with msg about 'success' or 'fail'
   */
  writeReviewBook(data){
    return this.http.post(`${this.url}/reviewbook/write`, data).pipe(
      tap(res => {
        this.showAlert('정상적으로 저장되었습니다.', '성공');
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
  };
}
