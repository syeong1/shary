import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  // url = 'http://localhost:5000';
  url = 'http://172.30.1.34:5000';


  constructor(private http: HttpClient, private alertController: AlertController) { }

  getBookData(title: string): Observable<any> {

    return this.http.get(`${this.url}/api/search/book/${title}`).pipe(
      map(results => {
        console.log(results);
        return results['items'];
      }),
      catchError(e => {
        let status = e.status;
        if (status === 401) {
          console.log("401 err")
        }
        throw new Error(e);
      })
    );
  }

  writeReview(data) {
    return this.http
      .post(`${this.url}/api/review/write`, data).pipe(
        tap(res => {
          this.showAlert('정상적으로 저장되었습니다.', '성공');
        }),
        catchError(e => {
          this.showAlert(e.error.msg, '오류');
          throw new Error(e);
        })
      );
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
