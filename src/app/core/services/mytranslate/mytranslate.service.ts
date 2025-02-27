import { isPlatformBrowser } from '@angular/common';
import {
  Inject,
  inject,
  Injectable,
  PLATFORM_ID,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class MytranslateService {
  private readonly renderer2 = inject(RendererFactory2).createRenderer(
    null,
    null
  );
  constructor(
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.translateService.setDefaultLang('en');
      const defauLtLang = localStorage.getItem('lang');

      if (defauLtLang) {
        this.translateService.use(defauLtLang!);
      }
      this.changeDirection();
    }
  }

  changeDirection() {
    if (localStorage.getItem('lang') === 'en') {
      this.renderer2.setAttribute(document.documentElement, 'dir', 'ltr');
      this.renderer2.setAttribute(document.documentElement, 'lang', 'en');
    } else if (localStorage.getItem('lang') === 'ar') {
      this.renderer2.setAttribute(document.documentElement, 'dir', 'rtl');
      this.renderer2.setAttribute(document.documentElement, 'lang', 'ar');
    }
  }
  changeLangauge(lang: string): void {
    localStorage.setItem('lang', lang);
    this.translateService.use(lang);
    this.changeDirection();
  }
}
