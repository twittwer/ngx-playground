import { Component } from '@angular/core';

@Component({
  selector: 'rtd-default-title',
  template: `
    <h2>Default Title</h2>

    <rtd-navigation></rtd-navigation>
    <router-outlet></router-outlet>
  `,
})
export class DefaultTitlePage {}
