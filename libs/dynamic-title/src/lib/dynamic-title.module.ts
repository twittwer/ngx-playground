import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import {
  defaultDynamicTitleConfig,
  DYNAMIC_TITLE_CONFIG,
  MinimalDynamicTitleConfig,
} from './dynamic-title-config';
import { DynamicTitleEffects } from './effects/dynamic-title.effects';

@NgModule({
  imports: [EffectsModule.forFeature([DynamicTitleEffects])],
})
export class DynamicTitleModule {
  public static forRoot(
    config: MinimalDynamicTitleConfig,
  ): ModuleWithProviders {
    return {
      ngModule: DynamicTitleModule,
      providers: [
        {
          provide: DYNAMIC_TITLE_CONFIG,
          useValue: { ...defaultDynamicTitleConfig, ...config },
        },
      ],
    };
  }
}
