import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {
      title: 'My requests to Brinit',
      url: '/pages/my-requests',
      icon: 'basket',
    },
    { title: 'I will Brinit!', url: '/pages/my-offers', icon: 'paper-plane' },
    { title: 'Favorites', url: '/pages/favorites', icon: 'heart' },
    { title: 'Archived', url: '/pages/archived', icon: 'archive' },
  ];
  //public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  public isLoggedIn = true;
  constructor() {}

  ngOnInit() {}
}
