import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Models } from '../../models';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  @Input() title:string = "";
  @Input() activeUser:Models.UserSession = null;
  @Output() onLogout:EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  logout(){ 
    this.onLogout.emit()
  }

}
