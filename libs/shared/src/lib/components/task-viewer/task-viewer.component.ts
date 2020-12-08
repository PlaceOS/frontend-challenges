import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Enums } from '../../enums';
import { Models } from '../../models';
import { EventBusService } from '../../services/event-bus.service';
import { TasksStoreService } from '../../services/tasks-store.service';

@Component({
  selector: 'shared-task-viewer',
  templateUrl: './task-viewer.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskViewerComponent implements OnInit, OnDestroy {

  @ViewChild('newtaskinput') newTaskInput: ElementRef;

  hasSelectedUser:boolean = false;

  taskFn = (index:number, task:Models.Task) => task.Id;
  private eventBusSub:Subscription;
  constructor(
    public taskStore:TasksStoreService,
    private eventBus:EventBusService,
    private cdf:ChangeDetectorRef
  ) {
    this.eventBusSub = this.eventBus.on(
      Enums.EventName.USER_SELECTED,
      (action:Models.IEventAction<void>)=>{
        if(action.Username && action.Username.length){
          this.hasSelectedUser = true;
          this.cdf.detectChanges();
        }
      }
    )
   }

  ngOnInit(): void {}

  ngOnDestroy(){
    if(this.eventBusSub)
      this.eventBusSub.unsubscribe();
  }

  onAddNewTask(description:string){
    if(description && description.length){
      this.taskStore.addTask(description);
      this.newTaskInput.nativeElement.value = "";
    }
  }

}
