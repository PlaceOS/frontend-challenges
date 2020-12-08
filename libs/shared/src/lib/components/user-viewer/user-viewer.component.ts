import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Enums } from '../../enums';
import { Models } from '../../models';
import { EventBusService } from '../../services/event-bus.service';
import { UserTodoStoreService } from '../../services/user-todo-store.service';

@Component({
  selector: 'shared-user-viewer',
  templateUrl: './user-viewer.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserViewerComponent implements OnInit {

  trackFn = (index:number,user:Models.UserTodo) => user.Username;

  taskChangeSub:Subscription;
  constructor(
    public userTodoStore:UserTodoStoreService,
    private eventbus:EventBusService
  ) { }

  ngOnInit(): void {}


  onSelectionChange(user:Models.UserTodo){
    const event:Models.IEvent<void> = {
      Name:Enums.EventName.USER_SELECTED,
      Action:{Username:user.Username}
    }
    this.eventbus.emit(event);
  }

}
