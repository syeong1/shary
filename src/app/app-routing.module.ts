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
  // 리뷰북리스트 
  {
    path: 'reviewbook/list/:category', loadChildren: './reviewbook/list/list.module#ListPageModule',
    canActivate: [AuthGuardService]
  },
  // 새 리뷰 작성 페이지
  { path: 'book/write/:reviewbook_id', loadChildren: './review/write/book/book.module#BookPageModule' },
  { path: 'food/write/:reviewbook_id', loadChildren: './review/write/food/food.module#FoodPageModule' },
  { path: 'music/write/:reviewbook_id', loadChildren: './review/write/music/music.module#MusicPageModule' },
  { path: 'movie/write/:reviewbook_id', loadChildren: './review/write/movie/movie.module#MoviePageModule' },
  { path: 'tv/write/:reviewbook_id', loadChildren: './review/write/tv/tv.module#TvPageModule' },


  // 리뷰 수정
  { path: 'book/edit/:review_id', loadChildren: './review/write/book/book.module#BookPageModule' },
  { path: 'food/edit/:review_id', loadChildren: './review/write/food/food.module#FoodPageModule' },
  { path: 'music/edit/:review_id', loadChildren: './review/write/music/music.module#MusicPageModule' },
  { path: 'movie/edit/:review_id', loadChildren: './review/write/movie/movie.module#MoviePageModule' },
  { path: 'tv/edit/:review_id', loadChildren: './review/write/tv/tv.module#TvPageModule' },

  // 리뷰 리스트 페이지
  { path: 'book/list/:id', loadChildren: './review/list/book-list/book-list.module#BookListPageModule' },
  { path: 'food/list/:id', loadChildren: './review/list/food-list/food-list.module#FoodListPageModule' },
  { path: 'music/list/:id', loadChildren: './review/list/music-list/music-list.module#MusicListPageModule' },
  { path: 'movie/list/:id', loadChildren: './review/list/movie-list/movie-list.module#MovieListPageModule' },
  { path: 'tv/list/:id', loadChildren: './review/list/tv-list/tv-list.module#TvListPageModule' },

  // 리뷰 디테일 페이지
  { path: 'book/detail/:id', loadChildren: './review/detail/book-detail/book-detail.module#BookDetailPageModule' },
  { path: 'food/detail/:id', loadChildren: './review/detail/food-detail/food-detail.module#FoodDetailPageModule' },
  { path: 'movie/detail/:id', loadChildren: './review/detail/movie-detail/movie-detail.module#MovieDetailPageModule' },
  { path: 'music/detail/:id', loadChildren: './review/detail/music-detail/music-detail.module#MusicDetailPageModule' },
  { path: 'tv/detail/:id', loadChildren: './review/detail/tv-detail/tv-detail.module#TvDetailPageModule' },

  // 구현 예정 
  { path: 'tv-api', loadChildren: './search/tv-api/tv-api.module#TvApiPageModule' },
  { path: 'review/movie', loadChildren: './search/review/movie/movie.module#MoviePageModule' },
  { path: 'share-photo', loadChildren: './review/share-photo/share-photo.module#SharePhotoPageModule' },
  { path: 'liker', loadChildren: './review/detail/liker/liker.module#LikerPageModule' },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
