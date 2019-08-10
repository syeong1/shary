import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  serverurl = environment.url;
  baseurl = "https://api.themoviedb.org/3/search";
  apiKey = "e02050f991ddedb779571b20eb62034b";

  constructor(private http: HttpClient, private alertController: AlertController) { }
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
  //director 검색(예시 변경해야함)
  searchDirector(): Observable<any> {
    return this.http.get('https://api.themoviedb.org/3/movie/17159/credits?api_key=e02050f991ddedb779571b20eb62034b')
      .pipe(
        map(results => {
          let a = results['crew'];

          results['test'] = a.filter(res1 => {
            return (res1.job == 'Director')
          }).filter(res2 => {
            console.log('res2', res2.department);
            return (res2.department == 'Directing')
          })
          return results['test'];
        })


      )
  }

  //리뷰리스트 가져오기
  getreviewBook() {
    return this.http.get(`${this.serverurl}/api/reviewbook`).pipe(

      catchError(e => {
        let status = e.status;
        if (status === 401) {
          this.showAlert('오류', '리스트 불러오기 실패');
        }
        throw new Error(e);
      })
    );
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
    return this.http.post(`${this.serverurl}/api/review/write`, data)
      .pipe(
        tap(res => {
          this.showAlert('정상적으로 저장되었습니다.', '성공');
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
