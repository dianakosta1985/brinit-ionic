import { Component, Input, OnInit } from '@angular/core';
import { Request } from '../../../../utiles/types';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.scss'],
})
export class RequestCardComponent implements OnInit {
  @Input() request!: Request;

  constructor() {}

  ngOnInit() {}

  deleteItem() {
    console.log('deleteItem');
  }
}
