import { Component, OnInit, OnDestroy, HostListener, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectLanguage, selectTheme } from './store/selectors/app.selectors';
import { AppState } from './store/app.state';

declare var AOS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Abdulrahman Alhuwais';
  private cursor: HTMLElement | null = null;
  private cursorDot: HTMLElement | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private renderer: Renderer2,
    private store: Store<{ app: AppState }>,
    private translate: TranslateService
  ) {
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 50 });
    }

    this.createCursorElements();

    // React to language changes from store
    this.store.select(selectLanguage)
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => {
        this.translate.use(lang);
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
      });

    // React to theme changes from store
    this.store.select(selectTheme)
      .pipe(takeUntil(this.destroy$))
      .subscribe(theme => {
        document.documentElement.setAttribute('data-theme', theme);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createCursorElements(): void {
    if (window.innerWidth > 768) {
      this.cursor = this.renderer.createElement('div');
      this.renderer.addClass(this.cursor, 'cursor-glow');
      this.renderer.appendChild(document.body, this.cursor);

      this.cursorDot = this.renderer.createElement('div');
      this.renderer.addClass(this.cursorDot, 'cursor-dot');
      this.renderer.appendChild(document.body, this.cursorDot);
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    if (this.cursor && this.cursorDot) {
      this.cursor.style.left = e.clientX + 'px';
      this.cursor.style.top = e.clientY + 'px';
      this.cursorDot.style.left = e.clientX + 'px';
      this.cursorDot.style.top = e.clientY + 'px';
    }
  }

  @HostListener('document:mousedown')
  onMouseDown(): void {
    if (this.cursor) this.renderer.addClass(this.cursor, 'click');
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    if (this.cursor) this.renderer.removeClass(this.cursor, 'click');
  }
}
