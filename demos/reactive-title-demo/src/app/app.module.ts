import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import { RouterTitlePage } from './pages/router-title/router-title.page';
import { appReducer } from './state/app.reducer';
import { StateTitlePage } from './pages/state-title/state-title.page';
import { StaticTitlePage } from './pages/static-title/static-title.page';
import { DefaultTitlePage } from './pages/default-title/default-title.page';
import { NavigationComponent } from './navigation.component';

@NgModule({
  imports: [
    BrowserModule,

    RouterModule.forRoot(ROUTES, { initialNavigation: 'enabled' }),

    StoreModule.forRoot(
      {
        router: routerReducer,
        app: appReducer,
      },
      {
        runtimeChecks: {
          strictActionImmutability: true,
          strictActionSerializability: true,
          strictActionTypeUniqueness: true,
          strictActionWithinNgZone: true,
          strictStateImmutability: true,
          strictStateSerializability: true,
        },
      },
    ),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({ name: 'Reactive Title Demo' }),
  ],
  declarations: [
    AppComponent,
    NavigationComponent,
    DefaultTitlePage,
    StaticTitlePage,
    RouterTitlePage,
    StateTitlePage,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
