import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { DynamicTitlePlaygroundActions } from '../../actions';

@Component({
  selector: 'dt-pg-dynamic-title',
  template: `
    <h2>
      Dynamic Title
    </h2>
    <dt-pg-title-nav *ngIf="!(isSubTitle$ | async)"></dt-pg-title-nav>
    <button (click)="setName('Foo')">Foo</button>
    <button (click)="setName('Bar')">Bar</button>
    <button (click)="setName()">Reset</button>
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicTitleComponent {
  public isSubTitle$ = this.activatedRoute.data.pipe(
    map((data) => data.isSubTitle),
  );

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly store: Store,
  ) {}

  public setName(name?: string): void {
    this.store.dispatch(DynamicTitlePlaygroundActions.setName({ name }));
  }
}
