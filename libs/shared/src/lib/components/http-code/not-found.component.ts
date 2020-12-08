import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'frontend-challenges-not-found',
  templateUrl: './not-found.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
