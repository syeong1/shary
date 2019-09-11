import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Geoposition } from '@ionic-native/geolocation/ngx';
import { MapService } from 'src/app/services/map.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-food-api',
  templateUrl: './food-api.page.html',
  styleUrls: ['./food-api.page.scss'],
})
export class FoodApiPage implements OnInit {

  results: Observable<any>;
  searchTerm: string='';
  selectplace = null;
  place: Geoposition;

  constructor(private mapService: MapService, private modalController: ModalController) { }

  ngOnInit() {
  }

  searchChanged(){
    this.results = this.mapService.searchPlace(this.searchTerm);
  }

  backtoWritepage(place){
    this.selectplace= place;
    this.modalController.dismiss(this.selectplace);
  }
  back(){
    this.modalController.dismiss();
  }

}
