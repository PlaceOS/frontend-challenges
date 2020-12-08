import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardService, AuthGuardService, ForbiddenComponent, NotFoundComponent, UnauthorizedComponent } from '@frontend-challenges/shared';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminMainComponent } from './admin-main/admin-main.component';

const routes: Routes = [
  {
    path:'',
    component:AdminLoginComponent
  },
  {
    path:'main',
    canActivate:[AuthGuardService,AdminGuardService],
    component:AdminMainComponent
  },
  {
    path:'unauthorized',
    component:UnauthorizedComponent
  },
  {
    path:'forbidden',
    component:ForbiddenComponent
  },
  {
    path:'**',
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AdminRoutingModule { }