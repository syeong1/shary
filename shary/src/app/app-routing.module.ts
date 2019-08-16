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
  { path: 'review/movie', loadChildren: './search/review/movie/movie.module#MoviePageModule' },
  { path: 'detail', loadChildren: './review/detail/detail.module#DetailPageModule' },
  { path: 'edit', loadChildren: './review/edit/edit.module#EditPageModule' },
  { path: 'share-photo', loadChildren: './review/share-photo/share-photo.module#SharePhotoPageModule' },
  { path: 'review/list', loadChildren: './review/list/list.module#ListPageModule' },
  { path: 'create', loadChildren: './reviewbook/create/create.module#CreatePageModule' },
  { path: 'reviewbook/list', loadChildren: './reviewbook/list/list.module#ListPageModule' },
  { path: 'write', loadChildren: './review/write/write.module#WritePageModule' },
  { path: 'movie', loadChildren: './review/write/movie/movie.module#MoviePageModule' },
  { path: 'food', loadChildren: './review/write/food/food.module#FoodPageModule' },
  { path: 'music', loadChildren: './review/write/music/music.module#MusicPageModule' },
  { path: 'book', loadChildren: './review/write/book/book.module#BookPageModule' },
  { path: 'food', loadChildren: './search/api/food/food.module#FoodPageModule' },
  { path: 'search/api/book', loadChildren: './search/api/book/book.module#BookPageModule' },
  { path: 'music-api', loadChildren: './search/music-api/music-api.module#MusicApiPageModule' },
  { path: 'book-api', loadChildren: './search/book-api/book-api.module#BookApiPageModule' },
  { path: 'movie-api', loadChildren: './search/movie-api/movie-api.module#MovieApiPageModule' },
  { path: 'food-api', loadChildren: './search/food-api/food-api.module#FoodApiPageModule' },
  { path: 'tv-api', loadChildren: './search/tv-api/tv-api.module#TvApiPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
