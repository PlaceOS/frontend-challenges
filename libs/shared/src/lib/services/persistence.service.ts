import { Injectable } from '@angular/core';
import { Models, _InitialData } from '../models';
import { SharedConfig } from '../shared.config';


@Injectable({
  providedIn:"root"
})
export class PersistenceService {

  private currentUserData = new Map();

  constructor() {
    const data = localStorage.getItem(SharedConfig.MOCK_PERSISTANCE_ID);
    const dataObj:Array<Models.IUserEntity> = (data && data.length > 0) ? JSON.parse(data) : this.initMockData();
    dataObj.forEach(e => this.currentUserData.set(e.Username,e));
    console.log("ApiService constructed. Got data",this.currentUserData);
  }

  authenticateUser(username:string,password:string):Models.UserSession{
    const entity:Models.IUserEntity = this.getIUserEntity(username);
    if(entity && entity.Password === password){
      return new Models.UserSession(entity);
    }
    return null;
  }

  getUserTodoByUsername(username:string):Models.UserTodo{
    if(!this.currentUserData.has(username)) return null;

    return this.convertEntitytoUserTasks(this.currentUserData.get(username));
  }

  getAllUserTodos():Array<Models.UserTodo>{
    const userEntities:Array<Models.IUserEntity> = this.getActiveUserEntities();
    const userTasks:Array<Models.UserTodo> = userEntities.map(e=>this.convertEntitytoUserTasks(e))
    return userTasks;
  }

  getTasksOfUser(username:string):Array<Models.Task>{
    if(!username || !this.currentUserData.has(username)) return [];

    let user:Models.IUserEntity = this.currentUserData.get(username);
    return user.Tasks;
  }

  updateUserTasks(tasks:Array<Models.Task>, username:string):boolean{
    if(!tasks || !this.currentUserData.has(username)) return false;

    let user:Models.IUserEntity = this.currentUserData.get(username);
    user.Tasks = tasks;
    this.commitData(this.getActiveUserEntities());
    return true;
  }

  // deleteTask(taskId:number, username:string):boolean{

  //   if(!this.currentUserData.has(username)) return false;
    
  //   let user:Models.IUserEntity = this.currentUserData.get(username);
  //   const idx = user.Tasks.findIndex(e => e.Id === taskId);
  //   if(idx > -1) user.Tasks.splice(idx,1);
  //   this.commitData(this.getActiveUserEntities());

  //   return true;
  // }

  private getIUserEntity(username:string):Models.IUserEntity{ 
    if(!this.currentUserData.has(username)) return null;

    return this.currentUserData.get(username);
  }

  private convertEntitytoUserTasks(IuserEntity:Models.IUserEntity){
    return new Models.UserTodo(IuserEntity);
  }

  private getActiveUserEntities():Array<Models.IUserEntity>{
    return Array.from(this.currentUserData.values());
  }

  private initMockData(){
    this.commitData(_InitialData);
    return _InitialData;
  }

  private commitData(data:Array<Models.IUserEntity>){
    localStorage.setItem(SharedConfig.MOCK_PERSISTANCE_ID, JSON.stringify(data));
  }
  
}
