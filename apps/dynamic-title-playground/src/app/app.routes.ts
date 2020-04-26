import { Route } from '@angular/router';
import { DynamicTitleComponent } from './container/dynamic-title/dynamic-title.component';
import { NoTitleComponent } from './container/no-title/no-title.component';
import { StaticTitleComponent } from './container/static-title/static-title.component';
import {
  selectNameAsSubTitle,
  selectNameAsTitle,
} from './reducers/dynamic-title-playground.reducer';

export const APP_ROUTES: Route[] = [
  {
    path: 'no-title',
    component: NoTitleComponent,
    children: [
      {
        path: 'no-title',
        component: NoTitleComponent,
        data: { isSubTitle: true },
      },
      {
        path: 'static-title',
        component: StaticTitleComponent,
        data: { isSubTitle: true, title: '[Sub] Static Title' },
      },
      {
        path: 'dynamic-title',
        component: DynamicTitleComponent,
        data: { isSubTitle: true, title$: selectNameAsSubTitle },
      },
    ],
  },
  {
    path: 'static-title',
    component: StaticTitleComponent,
    data: { title: 'Static Title' },
    children: [
      {
        path: 'no-title',
        component: NoTitleComponent,
        data: { isSubTitle: true },
      },
      {
        path: 'static-title',
        component: StaticTitleComponent,
        data: { isSubTitle: true, title: '[Sub] Static Title' },
      },
      {
        path: 'dynamic-title',
        component: DynamicTitleComponent,
        data: { isSubTitle: true, title$: selectNameAsSubTitle },
      },
    ],
  },
  {
    path: 'dynamic-title',
    component: DynamicTitleComponent,
    data: { title$: selectNameAsTitle },
    children: [
      {
        path: 'no-title',
        component: NoTitleComponent,
        data: { isSubTitle: true },
      },
      {
        path: 'static-title',
        component: StaticTitleComponent,
        data: { isSubTitle: true, title: '[Sub] Static Title' },
      },
      {
        path: 'dynamic-title',
        component: DynamicTitleComponent,
        data: { isSubTitle: true, title$: selectNameAsSubTitle },
      },
    ],
  },
];
