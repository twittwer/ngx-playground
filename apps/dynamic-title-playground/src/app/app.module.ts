import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DynamicTitleModule } from '@twittwer/dynamic-title';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { TitleNavComponent } from './components/title-nav/title-nav.component';
import { DynamicTitleComponent } from './container/dynamic-title/dynamic-title.component';
import { NoTitleComponent } from './container/no-title/no-title.component';
import { StaticTitleComponent } from './container/static-title/static-title.component';
import {
  DYNAMIC_TITLE_PLAYGROUND_FEATURE_KEY,
  dynamicTitlePlaygroundReducer,
} from './reducers/dynamic-title-playground.reducer';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,

    RouterModule.forRoot(APP_ROUTES, { initialNavigation: 'enabled' }),

    StoreModule.forRoot(
      { [DYNAMIC_TITLE_PLAYGROUND_FEATURE_KEY]: dynamicTitlePlaygroundReducer },
      {
        runtimeChecks: {
          strictActionImmutability: true,
          strictActionSerializability: true,
          strictStateImmutability: true,
          strictStateSerializability: true,
        },
      },
    ),
    EffectsModule.forRoot([]),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({ name: 'Dynamic Title Playground' }),

    DynamicTitleModule.forRoot({
      baseTitle: 'Dynamic Title Playground',
    }),
  ],
  declarations: [
    AppComponent,
    TitleNavComponent,
    NoTitleComponent,
    StaticTitleComponent,
    DynamicTitleComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
