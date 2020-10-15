import { Component } from '@angular/core';

@Component({
  selector: 'rtd-navigation',
  template: `
    <nav>
      <a routerLink="default">Default</a>
      <a routerLink="static">Static</a>
      <a routerLink="router" [queryParams]="{ query: 'Tardis' }">
        Router
      </a>
      <a routerLink="state">State</a>
    </nav>
  `,
  styles: ['a:not(:last-child) { margin-right: 0.5rem }'],
})
export class NavigationComponent {}
