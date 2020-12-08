import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Enums } from '../enums';
import { Models } from '../models';
import { AuthService } from '../services/auth.service';
import { PersistenceService } from '../services/persistence.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { EventBusService } from '../services/event-bus.service';

@Injectable({
  providedIn: 'root'
})
export class TasksStoreService implements OnDestroy {


  private readonly tasksSubject$ = new BehaviorSubject<Array<Models.Task>>([]);
  readonly tasks$ = this.tasksSubject$.asObservable();
  readonly activeTasks$ = this.tasks$.pipe(
    map((tasks:Array<Models.Task>) => tasks.filter(e => e.Status !== Enums.TaskStatus.DONE))
  )
  readonly completedTasks$ = this.tasks$.pipe(
    map((tasks:Array<Models.Task>)=> tasks.filter(e => e.Status === Enums.TaskStatus.DONE))
  );
  
  private get tasks():Array<Models.Task>{
    return this.tasksSubject$.getValue();
  }

  private set tasks(value:Array<Models.Task>){
    this.tasksSubject$.next(value);
  }

  private eventBusSub:Subscription;
  private viewingUsername:string = "";

  constructor(
    private persistence:PersistenceService,
    private authService:AuthService,
    private eventBus:EventBusService
  ) { 
    this.eventBusSub = this.eventBus.on(
      Enums.EventName.USER_SELECTED,
      (action:Models.IEventAction<void>)=>{
        this.viewingUsername = action.Username;
        this.loadUserTasks(action.Username);
      });
  }

  ngOnDestroy(){
    if(this.eventBusSub)
      this.eventBusSub.unsubscribe();
  }

  getTasks(){
    return this.tasks;
  }

  addTask(description:string){
    const newTask = new Models.Task();
    newTask.Description = description;
    this.tasks = this.sortTasksByStatus([...this.tasks,newTask]);
    this.updateTasksToPersistence();
  }

  deleteTask(id:number){
    this.tasks = this.tasks.filter(e => e.Id !== id);
    this.updateTasksToPersistence();
  }

  updateStatus(id:number, status:Enums.TaskStatus){
    const idx = this.tasks.findIndex(e => e.Id === id);
    if(idx > -1){
      this.tasks[idx].Status = status;
      this.tasks = this.sortTasksByStatus(this.tasks);
      this.updateTasksToPersistence();
    }
  }

  sortTasksByStatus(tasks:Array<Models.Task>){
    const active = tasks.filter(e => e.Status === Enums.TaskStatus.ACTIVE);
    const done = tasks.filter(e => e.Status === Enums.TaskStatus.DONE);
    return [...active, ...done];
  }

  reorderTasks(event: CdkDragDrop<Array<Models.Task>>){
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    this.tasks = [...this.tasks];
    this.updateTasksToPersistence();
  }

  private loadUserTasks(username:string){
    if(username && username.length)
      this.tasks = this.sortTasksByStatus(this.persistence.getTasksOfUser(username));
  }

  private updateTasksToPersistence(){
    if(this.viewingUsername && this.viewingUsername.length){
      this.persistence.updateUserTasks(this.tasks,this.viewingUsername);
      this.dispatchUserTaskChanges();
    }
  }

  private dispatchUserTaskChanges(){
    const action:Models.IEvent<Array<Models.Task>> = {
      Name: Enums.EventName.USER_TASK_UPDATED,
      Action:{
        Username: this.viewingUsername,
        Data: this.tasks}
      }
    this.eventBus.emit(action);
  }
}
