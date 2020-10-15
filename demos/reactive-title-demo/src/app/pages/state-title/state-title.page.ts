import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectName, setName } from '../../state/app.reducer';

@Component({
  selector: 'rtd-state-title',
  template: `
    <h2>State Title</h2>
    <div>State Name: {{ name$ | async }}</div>
    <button (click)="setName('The Doctor')">The Doctor</button>
    <button (click)="setName('John Smith')">John Smith</button>
    <br />
    <br />
    <rtd-navigation></rtd-navigation>
    <router-outlet></router-outlet>
  `,
  styles: ['button:not(:last-child) { margin-right: 0.5rem }'],
})
export class StateTitlePage {
  name$ = this.store.select(selectName);

  constructor(private readonly store: Store) {}

  setName(name: string) {
    this.store.dispatch(setName({ name }));
  }
}
