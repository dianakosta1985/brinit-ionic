import { Component, Input, OnInit } from '@angular/core';
import { data } from '../../../../api/dummyDate';
import { Request } from '../../../../utiles/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.page.html',
  styleUrls: ['./my-requests.page.scss'],
})
export class MyRequestsPage implements OnInit {
  @Input() requestData: Request[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.requestData = [...(data.requestsData as Request[])];
  }

  goToCreateRequest() {
    this.router.navigate(['/create-request']);
  }
}
