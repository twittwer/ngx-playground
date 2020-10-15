import { RouterReducerState } from '@ngrx/router-store';
import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';

export const setName = createAction('Set Name', props<{ name?: string }>());

export interface AppState {
  name?: string;
}

export const initialAppState: AppState = {};

export const appReducer = createReducer(
  initialAppState,
  on(setName, (state, { name }) => ({ name })),
);

export interface PartialAppState {
  app: AppState;
}

export const selectAppState = createFeatureSelector<PartialAppState, AppState>(
  'app',
);

export const selectName = createSelector(selectAppState, ({ name }) => name);
