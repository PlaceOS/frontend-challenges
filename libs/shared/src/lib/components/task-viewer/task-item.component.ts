import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { Enums } from '../../enums';
import { Models } from '../../models';

@Component({
  selector: 'task-item',
  templateUrl: './task-item.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent implements OnInit {

  @Input() task:Models.Task;
  @Output() onComplete:EventEmitter<Enums.TaskStatus> = new EventEmitter<Enums.TaskStatus>();
  @Output() onDelete:EventEmitter<number> = new EventEmitter<number>();

  doneStatus = Enums.TaskStatus.DONE;

  constructor() { }

  ngOnInit(): void {
  }

}
