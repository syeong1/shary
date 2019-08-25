import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TvService {

  url = 'http://localhost:5000';
  serverurl = environment.url;
  genres=[
    {"id": 10759,"name": "Action & Adventure"},
    {"id": 16,"name": "애니메이션"},
    {"id": 35,"name": "코미디"},
    {"id": 80,"name": "범죄"},
    {"id": 99,"name": "다큐멘터리"},
    {"id": 18,"name": "드라마"},
    {"id": 10751,"name": "가족"},
    {"id": 10762,"name": "Kids"},
    {"id": 9648,"name": "미스터리"},
    {"id": 10763,"name": "News"},
    {"id": 10764,"name": "Reality"},
    {"id": 10765,"name": "Sci-Fi & Fantasy"},
    {"id": 10766,"name": "Soap"},
    {"id": 10767,"name": "Talk"},
    {"id": 10768,"name": "War & Politics"},
    {"id": 37,"name": "서부"}
  ]
  constructor(private http: HttpClient, private alertController: AlertController, private toastController: ToastController) { }

  getTvData(title: string): Observable<any> {
    return this.http.get(`${this.url}/api/search/tv/${encodeURI(title)}`).pipe(
      map(results => {
        console.log(results);
        return results['results'];
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
  // 티비 리뷰 리스트 가져오기
  getBookReviewList(reviewbook_id: string) {
    return this.http.get(`${this.url}/api/review/tv/${reviewbook_id}`).pipe(
      catchError(e => {
        let status = e.status;
        if (status === 404) {
          // this.showAlert('리뷰가 없습니다.', '오류');
        }
        throw new Error(e);
      })
    )
  }
  //리뷰 등록하기
  writeReview(data) {
    return this.http.post(`${this.serverurl}/api/review/tv`, data)
      .pipe(
        tap(res => {
          this.presentToast('리뷰가 등록되었습니다.');
        }),
        catchError(e => {
          this.showAlert(e.error.msg, '오류');
          throw new Error(e);
        })
      )
  };
     //Genre id => 장르
     getGenre(id){
      for(let i of this.genres){
        if(i.id==id){
          return i.name
        }
      }return '';
    }
  // Toast 창
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
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
