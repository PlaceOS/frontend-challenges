import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'frontend-challenges-client-login',
  templateUrl: './client-login.component.html',
  styles: [
  ]
})
export class ClientLoginComponent implements OnInit {

  loginTitle:string = "Client To-do App Login";

  constructor() { }

  ngOnInit(): void {
  }

}
