export class TailwindThemeConfig {
  configUrl: string;
  constructor(obj: any | '' = {}) {
    this.configUrl = obj.configUrl || './assets/tailwind-theme.config.json';
  }
}
