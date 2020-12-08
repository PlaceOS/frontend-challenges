import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Enums } from '../enums';
import { Models } from '../models';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {

  private subject$ = new Subject();

  constructor() { }

  emit(event:Models.IEvent<any>){
    this.subject$.next(event);
  }

  on(eventName:Enums.EventName, action: any):Subscription{
    return this.subject$.pipe(
      filter((e:Models.IEvent<any>)=> e.Name === eventName),
      map((e:Models.IEvent<any>) => e.Action)
    ).subscribe(action);
  }
}
