import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Theme } from 'src/app/tailwind/tailwind-theme.interface';
import { TailwindThemeService } from 'src/app/tailwind/tailwind-theme.service';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent {

  private readonly violetTheme: Theme = {
    primary: '#7633ab',
    accent: '#491f7b',
    warn: '#ff7200',
  };

  private readonly emeraldTheme: Theme = {
    primary: ' #26A68F',
    accent: '#0b4552',
    warn: '#ff7200',
  };

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _tailwindService: TailwindThemeService
  ) { }

  changeThemeEmerald() {
    this._tailwindService.setTheme(this.emeraldTheme);
  }

  changeThemeViolet() {
    this._tailwindService.setTheme(this.violetTheme);
  }

}
