import { Component } from '@angular/core';

@Component({
  selector: 'rtd-static-title',
  template: `
    <h2>Static Title</h2>

    <rtd-navigation></rtd-navigation>
    <router-outlet></router-outlet>
  `,
})
export class StaticTitlePage {}
