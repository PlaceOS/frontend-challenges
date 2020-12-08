import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Enums } from '../enums';
import { Models } from '../models';
import { AuthService } from './auth.service';
import { EventBusService } from './event-bus.service';
import { PersistenceService } from './persistence.service';

@Injectable({
    providedIn: 'root'
})

export class UserTodoStoreService implements OnDestroy{

    private readonly userTodoSubject$ = new BehaviorSubject<Array<Models.UserTodo>>([]);
    readonly userTodos$ = this.userTodoSubject$.asObservable();
    userTodosChangeSub:Subscription;
    activeUserChangedSub:Subscription;


    private get userTodos():Array<Models.UserTodo>{
        return this.userTodoSubject$.getValue();
    }

    private set userTodos(value:Array<Models.UserTodo>){
        this.userTodoSubject$.next(value);
    }

    constructor(
        private eventBus:EventBusService,
        private authService:AuthService,
        private persistence:PersistenceService
    ){
        this.userTodosChangeSub = this.eventBus.on(
            Enums.EventName.USER_TASK_UPDATED,
            (action:Models.IEventAction<Array<Models.Task>>)=>{
              if(action.Username && action.Username.length && action.Data){
                this.updateUserTasks(action.Username,action.Data);
              }
            });
        
        this.activeUserChangedSub = this.authService.userChanged$
            .subscribe((user:Models.UserSession)=>{
                if(user){
                    this.userTodos = this.persistence.getAllUserTodos();
                }else{
                    this.userTodos = [];
                }
            })
    }

    ngOnDestroy(){
        if(this.userTodosChangeSub)
            this.userTodosChangeSub.unsubscribe();
        if(this.activeUserChangedSub)
            this.activeUserChangedSub.unsubscribe();
    }

    private updateUserTasks(username:string,tasks:Array<Models.Task>){
        const idx = this.userTodos.findIndex(e => e.Username === username);
        if(idx > -1){
          this.userTodos[idx].Tasks = tasks;
          this.userTodos = [...this.userTodos];
        }
      }


}