import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { AlertController, ToastController } from '@ionic/angular';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  url = environment.url;

  constructor(private http: HttpClient, public alertController: AlertController, public toastController: ToastController) { }

  getBookData(term: string): Observable<any> {

    return this.http.get(`${this.url}/api/search/book/${term}`).pipe(
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
