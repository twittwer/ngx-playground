import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { DynamicTitlePlaygroundActions } from '../actions';

export const DYNAMIC_TITLE_PLAYGROUND_FEATURE_KEY = 'dynamicTitlePlayground';

export interface DynamicTitlePlaygroundState {
  name?: string;
}

export const initialDynamicTitlePlaygroundState: DynamicTitlePlaygroundState = {};

export const dynamicTitlePlaygroundReducer = createReducer(
  initialDynamicTitlePlaygroundState,
  on(DynamicTitlePlaygroundActions.setName, (state, { name }) => ({ name })),
);

export const selectDynamicTitlePlayground = createFeatureSelector<
  DynamicTitlePlaygroundState
>(DYNAMIC_TITLE_PLAYGROUND_FEATURE_KEY);
export const selectName = createSelector(
  selectDynamicTitlePlayground,
  (state) => state.name,
);

export const selectNameAsTitle = createSelector(selectName, (name) =>
  name ? `Hello ${name}` : undefined,
);
export const selectNameAsSubTitle = createSelector(selectName, (name) =>
  name ? `[Sub] Hello ${name}` : undefined,
);
