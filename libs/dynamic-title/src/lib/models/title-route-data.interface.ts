import { DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';

export interface TitleRouteData {
  title?: string;
  title$?: DefaultProjectorFn<string> | MemoizedSelector<any, string>;
}
