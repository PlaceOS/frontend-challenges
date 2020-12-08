import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Models } from '../models';
import { SharedConfig } from '../shared.config';
import { PersistenceService } from './persistence.service';

@Injectable({
  providedIn:"root"
})
export class AuthService {

  //private activeUser:Models.UserSession;
  private readonly userSubject$ = new BehaviorSubject<Models.UserSession>(null);
  readonly userChanged$ = this.userSubject$.asObservable();

  private get activeUser():Models.UserSession{
    return this.userSubject$.getValue();
  }

  private set activeUser(value:Models.UserSession){
    this.userSubject$.next(value);
  }

  constructor(
    private persistence:PersistenceService
  ) { 
    this.checkLocalUserSession();
  }

  login(username:string, password:string):boolean{
    const user:Models.UserSession = this.persistence.authenticateUser(username,password);
    if(user){
      //Save to local session 
      sessionStorage.setItem(SharedConfig.USER_SESSION_DATA_ID,JSON.stringify(user));
      this.activeUser = user;
      
      return true;
    }
    return false;
  }

  logout(){
    this.clearLocalUserSession();
    this.activeUser = null;
  }

  getActiveUser(){
    return this.activeUser;
  }

  private checkLocalUserSession(){
    const sessionData = sessionStorage.getItem(SharedConfig.USER_SESSION_DATA_ID);
    if(sessionData && sessionData.length > 0){
      try{
        this.activeUser = <Models.UserSession>JSON.parse(sessionData);
      }
      catch(err){
        //Invalid parsing. Clearing invalid user session data exist.
        this.clearLocalUserSession();
      }
    }
    
  }

  private clearLocalUserSession(){
    sessionStorage.removeItem(SharedConfig.USER_SESSION_DATA_ID);
  }
}
