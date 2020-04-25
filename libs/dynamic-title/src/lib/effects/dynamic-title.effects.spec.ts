import { Provider } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { createServiceFactory } from '@ngneat/spectator/jest';
import { INITIAL_STATE } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import {
  DYNAMIC_TITLE_CONFIG,
  DynamicTitleConfig,
} from '../dynamic-title-config';
import { TitleRouteData } from '../models/title-route-data.interface';
import { DynamicTitleEffects } from './dynamic-title.effects';

describe('DynamicTitleEffects (spectator)', () => {
  const createService = createServiceFactory({
    service: DynamicTitleEffects,
    mocks: [Title],
    providers: [
      provideRouter(),
      provideActivatedRoute(),
      provideMockStore(),
      provideConfig({
        baseTitle: 'Spec',
        titleFormatter: (currentTitle) => currentTitle,
      }),
    ],
  });

  it('should use "baseTitle" in DynamicTitleConfig as default title', () => {
    const spectator = createService();
    const title = spectator.inject(Title);

    spectator.service.updateTitle$.subscribe();

    expect(title.setTitle).toHaveBeenLastCalledWith('Spec');
  });

  describe('ActivatedRoute processing', () => {
    it('should use "title" in ActivatedRoute data as title', () => {
      const activatedRoute: ActivatedRouteStub = {
        data: { title: 'Fix Title' },
      };

      const spectator = createService({
        providers: [provideActivatedRoute(activatedRoute)],
      });
      const title = spectator.inject(Title);

      spectator.service.updateTitle$.subscribe();

      expect(title.setTitle).toHaveBeenLastCalledWith('Fix Title');
    });

    it('should select title from Store via "title$" selector in ActivatedRoute data', () => {
      const activatedRoute: ActivatedRouteStub = {
        data: { title$: (state: { title: string }) => state.title },
      };

      const spectator = createService({
        providers: [
          provideActivatedRoute(activatedRoute),
          provideInitialState({ title: 'Selected Title' }),
        ],
      });
      const title = spectator.inject(Title);

      spectator.service.updateTitle$.subscribe();

      expect(title.setTitle).toHaveBeenLastCalledWith('Selected Title');
    });

    it('should prefer "title$" over "title" in ActivatedRoute data', () => {
      const activatedRoute: ActivatedRouteStub = {
        data: {
          title: 'Fix Title',
          title$: (state: { title: string }) => state.title,
        },
      };

      const spectator = createService({
        providers: [
          provideActivatedRoute(activatedRoute),
          provideInitialState({ title: 'Selected Title' }),
        ],
      });
      const title = spectator.inject(Title);

      spectator.service.updateTitle$.subscribe();

      expect(title.setTitle).toHaveBeenLastCalledWith('Selected Title');
    });

    describe('should prefer deepest title related property in nested ActivatedRoute data', () => {
      it('title', () => {
        const activatedRoute: ActivatedRouteStub = {
          data: {},
          firstChild: {
            data: { title$: () => 'Selected Title' },
            firstChild: {
              data: { title: 'Fix Title' },
              firstChild: {
                data: { title$: () => 'Selected Title #2' },
                firstChild: {
                  data: { title: 'Fix Title #2' },
                  firstChild: {
                    data: {},
                  },
                },
              },
            },
          },
        };

        const spectator = createService({
          providers: [provideActivatedRoute(activatedRoute)],
        });
        const title = spectator.inject(Title);

        spectator.service.updateTitle$.subscribe();

        expect(title.setTitle).toHaveBeenLastCalledWith('Fix Title #2');
      });

      it('title$', () => {
        const activatedRoute: ActivatedRouteStub = {
          data: {},
          firstChild: {
            data: { title$: () => 'Selected Title' },
            firstChild: {
              data: { title: 'Fix Title' },
              firstChild: {
                data: { title: 'Fix Title #2' },
                firstChild: {
                  data: { title$: () => 'Selected Title #2' },
                  firstChild: {
                    data: {},
                  },
                },
              },
            },
          },
        };

        const spectator = createService({
          providers: [provideActivatedRoute(activatedRoute)],
        });
        const title = spectator.inject(Title);

        spectator.service.updateTitle$.subscribe();

        expect(title.setTitle).toHaveBeenLastCalledWith('Selected Title #2');
      });
    });
  });

  it('should invoke "titleFormatter" with "currentTitle" & "baseTitle" to build actual title', () => {
    const baseTitle = 'Base Title';
    const currentTitle = 'Current Title';
    const actualTitle = 'Actual Title';

    const activatedRoute: ActivatedRouteStub = {
      data: { title: currentTitle },
    };
    const titleFormatter = jest.fn().mockReturnValue(actualTitle);

    const spectator = createService({
      providers: [
        provideActivatedRoute(activatedRoute),
        provideConfig({
          baseTitle,
          titleFormatter,
        }),
      ],
    });
    const title = spectator.inject(Title);

    spectator.service.updateTitle$.subscribe();

    expect(titleFormatter).toHaveBeenLastCalledWith(currentTitle, baseTitle);
    expect(title.setTitle).toHaveBeenLastCalledWith(actualTitle);
  });

  it('should start with "baseTitle" before the "title$" selector is resolved', () => {
    const activatedRoute: ActivatedRouteStub = {
      data: { title$: (state: { title: string }) => state.title },
    };

    const spectator = createService({
      providers: [
        provideActivatedRoute(activatedRoute),
        provideInitialState({ title: 'Selected Title' }),
      ],
    });
    const title = spectator.inject(Title);

    spectator.service.updateTitle$.subscribe();

    expect(title.setTitle).toHaveBeenCalledTimes(2);
    expect(title.setTitle).toHaveBeenNthCalledWith(1, 'Spec');
    expect(title.setTitle).toHaveBeenNthCalledWith(2, 'Selected Title');
  });
});

function provideRouter(
  events: Router['events'] = of(new NavigationEnd(1, '', '')),
): Provider {
  return {
    provide: Router,
    useValue: { events },
  };
}

type ActivatedRouteStub = {
  data?: TitleRouteData;
  firstChild?: ActivatedRouteStub;
};
type ActivatedRouteStubObservable = {
  data: Observable<TitleRouteData>;
  firstChild?: ActivatedRouteStubObservable;
};

function createActivatedRoute({
  data = {},
  firstChild = undefined,
}: ActivatedRouteStub = {}): ActivatedRouteStubObservable {
  return {
    data: of(data),
    firstChild: firstChild ? createActivatedRoute(firstChild) : undefined,
  };
}

function provideActivatedRoute({
  data = {},
  firstChild = undefined,
}: ActivatedRouteStub = {}): Provider {
  return {
    provide: ActivatedRoute,
    useValue: createActivatedRoute({ data, firstChild }),
  };
}

function provideInitialState(state: unknown): Provider {
  return {
    provide: INITIAL_STATE,
    useValue: state,
  };
}

function provideConfig(config: DynamicTitleConfig): Provider {
  return {
    provide: DYNAMIC_TITLE_CONFIG,
    useValue: config,
  };
}
