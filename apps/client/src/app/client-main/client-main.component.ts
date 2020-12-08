import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Models, AuthService, EventBusService, Enums } from '@frontend-challenges/shared';
import { Subscription } from 'rxjs';

@Component({
  selector: 'frontend-challenges-client-main',
  templateUrl: './client-main.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientMainComponent implements OnInit, OnDestroy {

  appName:string = "Client ToDo App";

  activeUser:Models.UserSession;
  userChangedSubscription:Subscription;

  constructor(
    private authService:AuthService,
    private router:Router,
    private eventBus:EventBusService
  ) { }

  ngOnInit(): void {
    this.userChangedSubscription = this.authService.userChanged$.subscribe((user:Models.UserSession)=>{
      if(user){
        this.activeUser = user;
        const event:Models.IEvent<void> = {
            Name:Enums.EventName.USER_SELECTED,
            Action:{Username:user.Username}}
        this.eventBus.emit(event);
      }else{
        //User unauthenticated. Perform logout
        this.router.navigate(['']);
      }
    });
  }

  ngOnDestroy(){
    if(this.userChangedSubscription)
      this.userChangedSubscription.unsubscribe();
  }

  doLogout(){
    this.authService.logout();
  }

}
