import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MusicService {

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
      'Access-ccess-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS'
    })
  };

  constructor(private http: HttpClient) { }

  getMusicData(title: string): Observable<any> {
    let url = 'https://itunes.apple.com/search';

    // https://itunes.apple.com/search?term=노래&country=kr
    return this.http.get(`${url}?term=${title}&meida=music&country=kr`, this.httpOptions).pipe(
      map(results => {
        console.log('service',results);
        return results['results'];
      }), catchError(e => {
        let status = e.status;
        if (status === 403) {
          console.log("403 권한 없음")
        }
        throw new Error(e);
      })
    );
  }
}
