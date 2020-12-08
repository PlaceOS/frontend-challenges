import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})

export class AuthGuardService implements CanActivate{

    constructor(
        private authService:AuthService,
        private router:Router
    ){}

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot){
        const user = this.authService.getActiveUser();
        if(user)
            return true;
        else
            this.router.navigate(['unauthorized']);
        
        return false;
    }
}