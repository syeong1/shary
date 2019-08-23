import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  url = 'http://localhost:5000';
  serverurl = environment.url;
  baseurl = "https://api.themoviedb.org/3/search";
  detailurl ="https://api.themoviedb.org/3"
  apiKey = "e02050f991ddedb779571b20eb62034b";
  genres=[{"id": 28,"name": "액션"},{"id": 12,"name": "모험"},{"id": 16,"name": "애니메이션"},{"id": 35,"name": "코미디"},
  {"id": 80,"name": "범죄"},{"id": 99,"name": "다큐멘터리"},{"id": 18,"name": "드라마"},{"id": 10751,"name": "가족"},{"id": 14,
"name": "판타지"},{"id": 36,"name": "역사"},{"id": 27,"name": "공포"},{"id": 10402,"name": "음악"},{"id": 9648,"name":"미스터리"},{"id": 10749,"name": "로맨스"},{"id": 878,"name": "SF"},{"id": 10770,"name": "TV 영화"},{"id": 53,"name":"스릴러"},{"id": 10752,"name": "전쟁"},{"id": 37,"name": "서부"}]

  constructor(private http: HttpClient, private alertController: AlertController,private toastController: ToastController) { }
  //The movie api 검색
  searchData(title: string, type: string): Observable<any> {
    return this.http.get(`${this.baseurl}/${type}?language=ko-kr&api_key=${this.apiKey}&query=${encodeURI(title)}`)
      .pipe(
        map(results => {
          console.log("영화검색결과", results['results']);
          return results['results']
        })
      );
  };
  //director 검색(변수랑 수정해야됨.)
  searchDirector(id:any): Observable<any>{
    return this.http.get(`${this.detailurl}/movie/${id}/credits?api_key=${this.apiKey}`)
    .pipe(
      map(results=>{
        let a = results['crew'];

        results['director']= a.filter(res1=>{
          return (res1.job=='Director')
        }).filter(res2=>{
          console.log('res2',res2.department);
          return (res2.department=='Directing')
        })
        return results['director'];
      })
      
      
    )
  }

  // 영화 리뷰 리스트 가져오기
  getBookReviewList(reviewbook_id: string) {
    return this.http.get(`${this.url}/api/review/movie/${reviewbook_id}`).pipe(
      catchError(e => {
        let status = e.status;
        if (status === 404) {
          // this.showAlert('리뷰가 없습니다.', '오류');
        }
        throw new Error(e);
      })
    )
  }
  //리뷰 리스트 작성
  writeReviewBook(data) {
    return this.http.post(`${this.serverurl}/api/reviewbook`, data)
      .pipe(
        tap(res => {
          this.showAlert('정상적으로 저장되었습니다', '성공');
        }),
        catchError(e => {
          this.showAlert(e.error.msg, '오류발생');
          throw new Error(e);
        })
      )
  }

  //리뷰 등록하기
  writeReview(data) {
    return this.http.post(`${this.serverurl}/api/review/movie/write`, data)
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
  //리뷰 detail 불러오기
  getDetailReview(id) {
    return this.http.get(`${this.serverurl}/api/review/${id}`);
  };

  //리뷰 삭제
  deleteReview(id) {
    return this.http.delete(`${this.serverurl}/api/review/${id}`);
  };

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
