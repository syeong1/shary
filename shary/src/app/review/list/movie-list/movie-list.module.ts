import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MovieListPage } from './movie-list.page';
import { ComponentsModule } from 'src/app/components/component.module';

const routes: Routes = [
  {
    path: '',
    component: MovieListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MovieListPage]
})
export class MovieListPageModule {}
