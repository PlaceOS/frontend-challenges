import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService, ForbiddenComponent, NotFoundComponent, UnauthorizedComponent } from '@frontend-challenges/shared';
import { ClientLoginComponent } from './client-login/client-login.component';
import { ClientMainComponent } from './client-main/client-main.component';

const routes: Routes = [
  {
    path:'',
    component:ClientLoginComponent
  },
  {
    path:'main',
    canActivate:[AuthGuardService],
    component:ClientMainComponent
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
export class ClientRoutingModule { }
