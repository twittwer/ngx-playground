import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectQuery } from '../../state/router.reducer';

@Component({
  selector: 'rtd-query-param',
  template: `
    <h2>Router Title</h2>
    <div>Query Param: {{ query$ | async }}</div>
    <br />
    <br />
    <rtd-navigation></rtd-navigation>
    <router-outlet></router-outlet>
  `,
})
export class RouterTitlePage {
  query$ = this.store.select(selectQuery);

  constructor(private readonly store: Store) {}
}
