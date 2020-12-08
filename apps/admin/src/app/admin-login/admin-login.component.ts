import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'frontend-challenges-admin-login',
  templateUrl: './admin-login.component.html',
  styles: [
  ]
})
export class AdminLoginComponent implements OnInit {
  loginTitle:string = "Admin To-do App Login";
  constructor() { }

  ngOnInit(): void {
  }

}
