# dynamic-title

> Define static/dynamic page titles via route configuration.

## Configuration

```typescript
@NgModule({
  imports: [
    DynamicTitleModule.forRoot({
      baseTitle: 'Application Name',
    }),
  ],
  /* ... */
})
export class AppModule {}
```

| Option         | Type                                  | Default                           | Description                                                    |
| -------------- | ------------------------------------- | --------------------------------- | -------------------------------------------------------------- |
| baseTitle\*    | `string`                              |                                   | Application name as default title or postfix.                  |
| titleFormatter | `(currentTitle, baseTitle) => string` | `${currentTitle} \| ${baseTitle}` | Formatter to build actual title based on current & base title. |

## Usage

```typescript
export const APP_ROUTES: Route[] = [
  {
    path: 'static',
    component: StaticComponent,
    data: {
      // Define static title via simple string
      title: 'Static Title',
    },
  },
  {
    path: 'dynamic',
    component: DynamicComponent,
    data: {
      // Define dynamic title via NgRx selector
      title$: selectDynamicTitle,
    },
  },
];
```
