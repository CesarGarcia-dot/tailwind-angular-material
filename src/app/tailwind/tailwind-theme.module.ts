// tailwind-theme.module.ts
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TailwindThemeService } from './tailwind-theme.service';
import { TailwindThemeConfig } from './tailwind-theme-config.class';
export function initTailwindThemeConfig(tailwindThemeSvc: TailwindThemeService) {
  return () => tailwindThemeSvc.loadConfig();
}
@NgModule({
  imports: [CommonModule],
  providers: [
    TailwindThemeService,
    {
      provide: APP_INITIALIZER,
      useFactory: initTailwindThemeConfig,
      deps: [TailwindThemeService],
      multi: true,
    },
  ],
})
export class TailwindThemeModule {
  static forRoot(config: TailwindThemeConfig): ModuleWithProviders<TailwindThemeModule> {
    return {
      ngModule: TailwindThemeModule,
      providers: [
        {
          provide: TailwindThemeConfig,
          useValue: config,
        },
        TailwindThemeService,
      ],
    };
  }
}
