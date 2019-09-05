import { Injectable } from '@angular/core';
import { ActionSheetController, LoadingController, ToastController } from '@ionic/angular';
import { Camera } from '@ionic-native/Camera/ngx';
import { File, FileEntry} from '@ionic-native/File/ngx';
import { HttpClient } from '@angular/common/http';
import { finalize, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  profile='';
  images = [];

  constructor(private camera: Camera,private actionSheetController: ActionSheetController,private file: File,private loadingController: LoadingController,private http: HttpClient,private toastController:ToastController,private authService:AuthService) { }


  //카메라열기
  async selectProfile(){
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image Source',
      buttons: [
        {
          text: '갤러리 열기',
          handler:() => {
            this.uploadProfile(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: '카메라 열기',
          handler: () => {
            this.uploadProfile(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: '취소',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async uploadProfile(sourceType){
    console.log('uploadProfile 메소드');
    let options = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    let imagePath = await this.camera.getPicture(options);
    let entry = await this.file.resolveLocalFilesystemUrl(imagePath);
    let file = await this.getfile(entry);
    this.readFile(file);
  }

  getfile(filepath){
    return new Promise(function(resolve,reject){
      <FileEntry>filepath.file(file=>{
        resolve(file);
      })
    })
  }
  readFile(file: any) {
    console.log("readFile 메소드");
    console.log(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {
        type: file.type
      });
      formData.append('file', imgBlob, file.name);

      this.uploadImageData(formData);
    };
    reader.readAsArrayBuffer(file);
  }
  async uploadImageData(formData: FormData) {
    const loading = await this.loadingController.create({
      message: 'Uploading image...',
    });
    await loading.present();

    this.http.post("http://172.30.1.15:5000/api/images", formData)
      .pipe(
        finalize(() => {
          loading.dismiss();
        }),
        catchError(e => {
          let status = e.status;
          console.log(e);
          throw new Error(e);
        })
        
      )
      .subscribe(res => {
        console.log('succes',res['success']);
        if (res['success']) {
          this.presentToast('File upload complete.')
          this.profile= 'http://172.30.1.15:5000/api/images/'+this.authService.user.id+'?'+(new Date()).getTime();
          
        } else {
          this.presentToast('File upload failed.')
        }
      });
  }
  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }
}
