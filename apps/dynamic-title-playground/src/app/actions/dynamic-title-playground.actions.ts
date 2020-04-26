import { createAction, props } from '@ngrx/store';

export const setName = createAction(
  '[DynamicTitlePlayground] Set Name',
  props<{ name?: string }>(),
);
