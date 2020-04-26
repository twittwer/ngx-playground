import { Component } from '@angular/core';

@Component({
  selector: 'dt-pg-root',
  template: `
    <h1>
      Dynamic Title Playground
    </h1>
    <dt-pg-title-nav></dt-pg-title-nav>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
