import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [

  { path: '', loadChildren: './pages/main-tabs/main-tabs.module#MainTabsPageModule' },
  { path: 'sign-up', loadChildren: './member/sign-up/sign-up.module#SignUpPageModule' },
  { path: 'login', loadChildren: './member/login/login.module#LoginPageModule' },
  {
    path: 'mypage', loadChildren: './member/mypage/mypage.module#MypagePageModule',
    canActivate: [AuthGuardService]
  },
  { path: 'app-password', loadChildren: './member/app-password/app-password.module#AppPasswordPageModule' },
  {
    path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule',
    canActivate: [AuthGuardService], runGuardsAndResolvers: 'always'
  },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'search', loadChildren: './pages/search/search.module#SearchPageModule' },
  { path: 'api/movie', loadChildren: './search/api/movie/movie.module#MoviePageModule' },
  { path: 'review/movie', loadChildren: './search/review/movie/movie.module#MoviePageModule' },
  { path: 'detail', loadChildren: './review/detail/detail.module#DetailPageModule' },
  { path: 'edit', loadChildren: './review/edit/edit.module#EditPageModule' },
  { path: 'share-photo', loadChildren: './review/share-photo/share-photo.module#SharePhotoPageModule' },
  { path: 'review/list', loadChildren: './review/list/list.module#ListPageModule' },
  { path: 'create', loadChildren: './reviewbook/create/create.module#CreatePageModule' },
  { path: 'reviewbook/list', loadChildren: './reviewbook/list/list.module#ListPageModule' },
  { path: 'write', loadChildren: './review/write/write.module#WritePageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
