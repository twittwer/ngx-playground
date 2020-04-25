import { InjectionToken } from '@angular/core';

export interface DynamicTitleConfig {
  baseTitle: string;
  titleFormatter: (currentTitle: string, baseTitle: string) => string;
}

export const DYNAMIC_TITLE_CONFIG = new InjectionToken<DynamicTitleConfig>(
  'DYNAMIC_TITLE_CONFIG',
);

export type DefaultDynamicTitleConfig = Omit<DynamicTitleConfig, 'baseTitle'>;
export type MinimalDynamicTitleConfig = Pick<DynamicTitleConfig, 'baseTitle'> &
  Partial<DynamicTitleConfig>;

export const defaultDynamicTitleConfig: DefaultDynamicTitleConfig = {
  titleFormatter: (currentTitle, baseTitle) => `${currentTitle} | ${baseTitle}`,
};
