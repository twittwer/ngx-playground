import { Route } from '@angular/router';
import { DefaultTitlePage } from './pages/default-title/default-title.page';
import { RouterTitlePage } from './pages/router-title/router-title.page';
import { StateTitlePage } from './pages/state-title/state-title.page';
import { StaticTitlePage } from './pages/static-title/static-title.page';

export const ROUTES: Route[] = [
  {
    path: 'default',
    component: DefaultTitlePage,
    children: [
      {
        path: 'default',
        component: DefaultTitlePage,
      },
      {
        path: 'static',
        component: StaticTitlePage,
      },
      {
        path: 'router',
        component: RouterTitlePage,
      },
      {
        path: 'state',
        component: StateTitlePage,
      },
    ],
  },
  {
    path: 'static',
    component: StaticTitlePage,
    children: [
      {
        path: 'default',
        component: DefaultTitlePage,
      },
      {
        path: 'static',
        component: StaticTitlePage,
      },
      {
        path: 'router',
        component: RouterTitlePage,
      },
      {
        path: 'state',
        component: StateTitlePage,
      },
    ],
  },
  {
    path: 'router',
    component: RouterTitlePage,
    children: [
      {
        path: 'default',
        component: DefaultTitlePage,
      },
      {
        path: 'static',
        component: StaticTitlePage,
      },
      {
        path: 'router',
        component: RouterTitlePage,
      },
      {
        path: 'state',
        component: StateTitlePage,
      },
    ],
  },
  {
    path: 'state',
    component: StateTitlePage,
    children: [
      {
        path: 'default',
        component: DefaultTitlePage,
      },
      {
        path: 'static',
        component: StaticTitlePage,
      },
      {
        path: 'router',
        component: RouterTitlePage,
      },
      {
        path: 'state',
        component: StateTitlePage,
      },
    ],
  },
];
