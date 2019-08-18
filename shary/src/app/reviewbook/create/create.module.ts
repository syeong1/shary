import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
=======
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
>>>>>>> 0fdb8bd05d4d4c9a6d9c833c6f81a45c8ee33c90
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreatePage } from './create.page';

const routes: Routes = [
  {
    path: '',
    component: CreatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
<<<<<<< HEAD
    IonicModule,
    ReactiveFormsModule,
=======
    IonicModule,ReactiveFormsModule,
>>>>>>> 0fdb8bd05d4d4c9a6d9c833c6f81a45c8ee33c90
    RouterModule.forChild(routes)
  ],
  declarations: [CreatePage]
})
export class CreatePageModule {}
