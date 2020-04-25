import { Inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { createEffect } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import {
  DYNAMIC_TITLE_CONFIG,
  DynamicTitleConfig,
} from '../dynamic-title-config';
import { TitleRouteData } from '../models/title-route-data.interface';

@Injectable({ providedIn: 'root' })
export class DynamicTitleEffects {
  public updateTitle$ = createEffect(
    () =>
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.getRouteDataStreams()),
        switchMap((dataStreams) => combineLatest(dataStreams)),
        map((dataObjects) =>
          dataObjects.reduce(
            (prev, { title, title$ }) =>
              title$ ? { title$ } : title ? { title } : prev,
            {},
          ),
        ),
        switchMap(({ title, title$ }) => {
          if (title$) {
            return this.store.pipe(
              select(title$),
              map((selectedTitle) => selectedTitle ?? title),
              startWith(undefined),
            );
          }
          return of(title);
        }),
        map((title) => {
          const { baseTitle, titleFormatter } = this.config;
          return title ? titleFormatter(title, baseTitle) : baseTitle;
        }),
        tap((title) => {
          this.title.setTitle(title);
        }),
      ),
    {
      dispatch: false,
    },
  );

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly store: Store,
    private readonly title: Title,
    @Inject(DYNAMIC_TITLE_CONFIG) private readonly config: DynamicTitleConfig,
  ) {}

  private getRouteDataStreams(): Array<Observable<TitleRouteData>> {
    const dataStreams: Array<Observable<TitleRouteData>> = [];

    let route = this.activatedRoute;
    dataStreams.push(route.data);

    while (route.firstChild) {
      route = route.firstChild;
      dataStreams.push(route.data);
    }

    return dataStreams;
  }
}
