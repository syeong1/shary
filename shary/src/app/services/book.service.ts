import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getBookData(title: string): Observable<any> {
    let url = 'http://localhost:5000';

    return this.http.get(`${url}/api/search/book/${title}`).pipe(
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

}
