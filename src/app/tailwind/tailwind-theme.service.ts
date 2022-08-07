// tailwind-theme.service.ts
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { TailwindThemeConfig } from './tailwind-theme-config.class';
import { tap } from 'rxjs/operators';
import { updateThemeVariables } from './tailwind-utils';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { Theme } from './tailwind-theme.interface';

@Injectable()
export class TailwindThemeService {
  private readonly defaultTheme: Theme = {
    primary: '#002c65',
    accent: '#0550d2',
    warn: '#d3bf0b',
  };
  private readonly $currentTheme = new BehaviorSubject<Theme>(this.defaultTheme);

  constructor(
    private _http: HttpClient,
    @Inject(DOCUMENT) private readonly document: Document,
    private config: TailwindThemeConfig,
  ) { }
  loadConfig(): Promise<any> {
    const configUrl = this.config.configUrl || './assets/tailwind-theme.config.json';
    const source$ = this._http
      .get(`${configUrl}`)
      .pipe(
        tap((configObject: any) => this._http.get(configObject.themeUrl))
      );

    const promiseRxjs = lastValueFrom(source$);
    promiseRxjs.then((themeData: any) => {
      updateThemeVariables(themeData, this.document);
    }).catch((error: any): void => {
        console.log(error);
        console.log('There was an error while loading the Tailwind Theme.');
      });
    return promiseRxjs;
  }

  get currentTheme$(): Observable<Theme> {
    return this.$currentTheme.asObservable();
  }

  get currentTheme(): Theme {
    return this.$currentTheme.getValue();
  }

  setTheme(theme: Theme) {
    this.$currentTheme.next(theme);
    updateThemeVariables(theme, this.document);
  }
}
