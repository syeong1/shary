import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ReviewbookService {

  constructor(private http: HttpClient, private alertController: AlertController) { }

  url = 'http://localhost:5000';
  // url = 'http://172.30.1.34:5000';



  /**
   * get reviewBooks list
   * @param category 
   * @return {Observable} results with information about reviewbook
   */
  getReviewBookList(category: string) {
    return this.http.get(`${this.url}/api/reviewbook/${category}`).pipe(
      catchError(e => {
        let status = e.status;
        if (status === 400) {
          this.showAlert('리뷰북이 없습니다. 생성하시겠습니까?', '오류');
        }
        throw new Error(e);
      })
    )
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
