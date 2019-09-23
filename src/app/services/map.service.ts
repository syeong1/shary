import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, pluck } from 'rxjs/operators';
import { environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  url = environment.url
  
  /**
   * 'Search Place' API를 통해 데이터 가져오기
   * pipe(pluck())을 통해 Observable형태로 결과 데이터를 받는다.
   * @param {string} from name
   * @returns Observable with results
   */
  searchPlace(name: string): Observable<any>{
    return this.http.get(`${this.url}/api/map?name=${name}&coordinate=127.1054328,37.3595963`)
    .pipe(
      pluck('places')
    );
  }
}
