import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieApiPageModule } from './search/movie-api/movie-api.module';
import { MusicApiPageModule } from './search/music-api/music-api.module';
import { BookApiPageModule } from './search/book-api/book-api.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FoodApiPageModule } from './search/food-api/food-api.module';
import { CreatePageModule } from './reviewbook/create/create.module';
import { TvApiPageModule } from './search/tv-api/tv-api.module';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/File/ngx';




export function jwtOptionsFactory(storage) {
  return {
    tokenGetter: () => {
      return storage.get('access_token');
    },
    whitelistedDomains: ['172.30.1.15:5000']
  }
}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,
    MovieApiPageModule, MusicApiPageModule, BookApiPageModule, FoodApiPageModule,
    TvApiPageModule, CreatePageModule,
    IonicStorageModule.forRoot(),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage]
      }
    }), FormsModule,
    ReactiveFormsModule
  ],

  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Geolocation,
    SocialSharing,
    Camera,
    File
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
