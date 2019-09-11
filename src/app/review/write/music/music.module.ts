import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MusicPage } from './music.page';
import { ComponentsModule } from 'src/app/components/component.module';

const routes: Routes = [
  {
    path: '',
    component: MusicPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,    
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MusicPage]
})
export class MusicPageModule {}
