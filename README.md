# HawiCreate
There are two websites in this prject.
1. Is the admin website. It is located in hawicreate
2. Is the public website. It is located in hawicreate>projects>hawicreate

## Development server

1. Admin dev server: Run `ng serve`, navigate to `http://localhost:4200/`
2. Public dev serer: Run `ng serve hawicreate`, navigate to `http://localhost:4200/`

## Production Build
1. Admin build to prod: Run `ng build --prod`
2. Public build to prod: Run `ng build hawicreate --prod`

## Firebase Hosting Deploy
Depolys only web code
1. Admin deploy: Run `firebase deploy --only hosting`
2. Public deploy: Run `firebase deploy --only hosting:hawicreate`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
