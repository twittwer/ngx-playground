import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dt-pg-title-nav',
  template: `
    <nav>
      <a routerLink="no-title">No Title</a>
      <a routerLink="static-title">Static Title</a>
      <a routerLink="dynamic-title">Dynamic Title</a>
    </nav>
  `,
  styles: ['a:not(:last-child) { margin-right: 0.5em; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleNavComponent {}
