import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Enums } from '../enums';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})

export class AdminGuardService implements CanActivate{

    constructor(
        private authService:AuthService,
        private router:Router
    ){}

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot){
        const user = this.authService.getActiveUser();
        if(user && user.Type === Enums.UserType.ADMIN)
            return true;
        else
            this.router.navigate(['forbidden']);
        
        return false;

    }
}