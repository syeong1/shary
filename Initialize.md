## Initialize


ionic start shary tabs —type=angular

cd shary

ionic g page member/sign-up

ionic g page member/login

ionic g page member/mypage

ionic g page member/app-password


ionic g page pages/main-tabs

ionic g page pages/settings

ionic g page pages/home

ionic g page pages/search


ionic g page search/api/movie

ionic g page search/review/movie


ionic g page review/detail

ionic g page review/create

ionic g page review/edit

ionic g page review/share-photo

ionic g page review/list






ionic g page reviewbook/create

ionic g page reviewbook/list


ionic g service services/auth
ionic g service services/authGuard

ionic g service services/movie


npm i @ionic/storage
npm i @auth0/angular-jwt



ionic cordova plugin add cordova-sqlite-storage


<br><br>
## Install the Lab Package
npm i @ionic/lab


<br><br>
## Run your app with device preview and platform styles
ionic lab
