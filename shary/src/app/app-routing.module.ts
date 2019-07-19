import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: '', redirectTo: 'main-tabs', pathMatch: 'full' },
  { path: '', loadChildren: './pages/main-tabs/main-tabs.module#MainTabsPageModule' },
  { path: 'sign-up', loadChildren: './member/sign-up/sign-up.module#SignUpPageModule' },
  { path: 'login', loadChildren: './member/login/login.module#LoginPageModule' },
  { path: 'mypage', loadChildren: './member/mypage/mypage.module#MypagePageModule' },
  { path: 'app-password', loadChildren: './member/app-password/app-password.module#AppPasswordPageModule' },
  { path: 'main-tabs', loadChildren: './pages/main-tabs/main-tabs.module#MainTabsPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'search', loadChildren: './pages/search/search.module#SearchPageModule' },
  { path: 'movie', loadChildren: './search/api/movie/movie.module#MoviePageModule' },
  { path: 'movie', loadChildren: './search/review/movie/movie.module#MoviePageModule' },
  { path: 'detail', loadChildren: './review/detail/detail.module#DetailPageModule' },
  { path: 'create', loadChildren: './review/create/create.module#CreatePageModule' },
  { path: 'edit', loadChildren: './review/edit/edit.module#EditPageModule' },
  { path: 'share-photo', loadChildren: './review/share-photo/share-photo.module#SharePhotoPageModule' },
  { path: 'list', loadChildren: './review/list/list.module#ListPageModule' },
  { path: 'create', loadChildren: './reviewbook/create/create.module#CreatePageModule' },
  { path: 'list', loadChildren: './reviewbook/list/list.module#ListPageModule' },
  { path: 'write', loadChildren: './review/write/write.module#WritePageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
