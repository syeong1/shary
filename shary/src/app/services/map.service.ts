import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, pluck } from 'rxjs/operators';
import { Geoposition } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }


  /**
   * 'Search Place' API를 통해 데이터 가져오기
   * pipe(map())을 통해 Observable형태로 결과 데이터를 받는다.
   * @param {string} from name
   * @returns Observable with results
   */
  searchPlace(name: string): Observable<any>{
    return this.http.get(`http://192.168.1.121:5000/api/map?name=${name}&coordinate=127.1054328,37.3595963`)
    .pipe(
      pluck('places')
    );
  }
}
