import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map, pluck } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.url;

  constructor(private http: HttpClient) {}
  
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
}
