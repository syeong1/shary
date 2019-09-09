import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MusicService {

  url = environment.url;

  constructor(private http: HttpClient) { }

  getMusicData(term: string): Observable<any> {
    return this.http.get(`${this.url}/api/search/music/${term}`).pipe(
      map(results => {
        console.log('service', results);
        return results['results'];
      }),
      catchError(e => {
        let status = e.status;
        if (status === 401) {
          console.log("401 err")
        }
        if (status === 403) {
          console.log("403 권한 없음")
        }
        throw new Error(e);
      })
    );
  }
}
