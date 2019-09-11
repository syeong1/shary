import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MusicDetailPage } from './music-detail.page';
import { ComponentsModule } from 'src/app/components/component.module';

const routes: Routes = [
  {
    path: '',
    component: MusicDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MusicDetailPage]
})
export class MusicDetailPageModule { }
