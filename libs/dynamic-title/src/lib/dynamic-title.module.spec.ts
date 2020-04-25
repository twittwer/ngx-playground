import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  defaultDynamicTitleConfig,
  DYNAMIC_TITLE_CONFIG,
  DynamicTitleConfig,
} from './dynamic-title-config';
import { DynamicTitleModule } from './dynamic-title.module';

describe('DynamicTitleModule', () => {
  it('should merge provided config with the default config', () => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        DynamicTitleModule.forRoot({
          baseTitle: 'Spec',
        }),
      ],
    });

    const dynamicTitleConfig = TestBed.inject(DYNAMIC_TITLE_CONFIG);
    expect(dynamicTitleConfig).toMatchSnapshot();
    expect(dynamicTitleConfig.baseTitle).toBe('Spec');
    expect(dynamicTitleConfig.titleFormatter).toBe(
      defaultDynamicTitleConfig.titleFormatter,
    );
  });

  it('should override default with provided config', () => {
    const titleFormatter: DynamicTitleConfig['titleFormatter'] = (
      currentTitle,
      baseTitle,
    ) => `${currentTitle} - ${baseTitle}`;

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        DynamicTitleModule.forRoot({
          baseTitle: 'Spec',
          titleFormatter,
        }),
      ],
    });

    const dynamicTitleConfig = TestBed.inject(DYNAMIC_TITLE_CONFIG);
    expect(dynamicTitleConfig).toMatchSnapshot();
    expect(dynamicTitleConfig.baseTitle).toBe('Spec');
    expect(dynamicTitleConfig.titleFormatter).toBe(titleFormatter);
  });
});
