import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';

export interface PartialRouterState {
  router: RouterReducerState<any>;
}

export const selectRouterState = createFeatureSelector<
  PartialRouterState,
  RouterReducerState<any>
>('router');

export const {
  selectCurrentRoute, // select the current route
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl, // select the current url
} = getSelectors(selectRouterState);

export const selectQuery = selectQueryParam('query');
