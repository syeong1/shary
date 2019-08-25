import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewbookService {

  constructor(private http: HttpClient, private alertController: AlertController, public toastController: ToastController) { }

  url = environment.url;
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
        }if(status === 401){
          console.log(e);
        }
        throw new Error(e);
      })
    )
  }


  //새 리뷰북 작성
  createReviewBook(data) {
    return this.http.post(`${this.url}/api/reviewbook`, data)
      .pipe(
        tap(res => {
          this.presentToast();
        })
        // catchError(e => {
        //   this.showAlert(e.error.msg, '오류');
        //   throw new Error(e);
        // })
      )
  };


  //Alert창 생성 메소드
  showAlert(msg, title) {
    let alert = this.alertController.create({
      message: msg,
      header: title,
      buttons: ['확인']
    });
    alert.then(alert => alert.present());
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: '새로운 리뷰북이 추가되었습니다.',
      duration: 2000
    });
    toast.present();
  }
}
