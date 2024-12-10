import { Component, Input, OnInit } from '@angular/core';
import { date } from '../../../../api/dummyDate';
import { Request } from '../../../../utiles/types';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.page.html',
  styleUrls: ['./my-requests.page.scss'],
})
export class MyRequestsPage implements OnInit {
  @Input() requestData: Request[] = [];

  constructor() {}

  ngOnInit() {
    this.requestData = [...(date.requestsData as Request[])];
  }
}
