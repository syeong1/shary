import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.url;

  constructor(private http: HttpClient, private toastController: ToastController
    , private alertController: AlertController) {}
  
  getProfile() {
    return this.http.get(`${this.url}/api/mypage`).pipe(
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

  // 닉네임 변경하기
  updateNickname(data: FormData) {
    return this.http
      .patch(`${this.url}/api/mypage`, data).pipe(
        tap(res => {
          this.presentToast('닉네임 수정되었습니다.');
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
