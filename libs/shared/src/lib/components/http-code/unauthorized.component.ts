import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Models } from '../../models';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'frontend-challenges-unauthorized',
  templateUrl: './unauthorized.component.html',
  styles: [
  ]
})
export class UnauthorizedComponent implements OnInit, OnDestroy {

  userChangeSub:Subscription;
  constructor(
    private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {

  }

  ngOnDestroy(){
    if(this.userChangeSub)
      this.userChangeSub.unsubscribe();
  }

  logout(){
    this.authService.logout();
  }

}
