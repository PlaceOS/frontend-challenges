import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService , Models, PersistenceService } from '@frontend-challenges/shared';
import { Subscription } from 'rxjs';

@Component({
  selector: 'frontend-challenges-admin-main',
  templateUrl: './admin-main.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminMainComponent implements OnInit, OnDestroy {

  appName:string = "Admin ToDo App";
  activeUser:Models.UserSession;
  activeUserChangedSub:Subscription;
  
  constructor(
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.activeUserChangedSub = this.authService.userChanged$.subscribe((user:Models.UserSession)=>{
      if(user){
        this.activeUser = user;
      }else{
        //User unauthenticated. Perform logout
        this.router.navigate(['']);
      }
    });
  }

  ngOnDestroy(){
    if(this.activeUserChangedSub)
      this.activeUserChangedSub.unsubscribe();
  }

  doLogout(){
    this.authService.logout();
  }

}
