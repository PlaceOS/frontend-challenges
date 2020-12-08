import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Models } from '../../models';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'shared-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  @Input() title:string = "Login page";

  message:string = "";
  private userChangedSubscription:Subscription;

  constructor(
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
    // this.userChangedSubscription = this.authService.userChanged$.subscribe((user:Models.UserSession)=>{
    //   if(user){
    //     this.router.navigate(['/main'])
    //   }
    // });
  }

  // ngOnDestroy(){
  //   if(this.userChangedSubscription) 
  //     this.userChangedSubscription.unsubscribe();
  // }

  login(username:string,password:string){
    this.message = "";
    if(!this.authService.login(username,password)){
      this.message = "Invalid Username or Password";
    }else{
      this.router.navigate(['/main']);
    }
  }

}
