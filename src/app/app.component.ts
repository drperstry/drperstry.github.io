import { Component, OnInit, OnDestroy, HostListener, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import AOS from 'aos';

import { selectLanguage, selectTheme } from './store/selectors/app.selectors';
import { AppState, persistPreferences } from './store/app.state';
import { NavbarComponent } from './Component/navbar/navbar.component';
import { FooterComponent } from './Component/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, NavbarComponent, FooterComponent, TranslatePipe]
})
export class AppComponent implements OnInit, OnDestroy {
  showBackToTop = false;

  private cursor: HTMLElement | null = null;
  private cursorDot: HTMLElement | null = null;
  private destroy$ = new Subject<void>();
  private prefersReducedMotion =
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

  constructor(
    private renderer: Renderer2,
    private store: Store<{ app: AppState }>,
    private translate: TranslateService
  ) {
    translate.addLangs(['en', 'ar']);
  }

  ngOnInit(): void {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      disable: this.prefersReducedMotion
    });

    this.createCursorElements();

    this.store.select(selectLanguage)
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => {
        this.translate.use(lang);
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        // Element positions shift when the layout direction flips
        requestAnimationFrame(() => AOS.refresh());
      });

    this.store.select(selectTheme)
      .pipe(takeUntil(this.destroy$))
      .subscribe(theme => {
        document.documentElement.setAttribute('data-theme', theme);
        document.querySelector('meta[name="theme-color"]')
          ?.setAttribute('content', theme === 'dark' ? '#0f172a' : '#ffffff');
      });

    this.store.select(state => state.app)
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => persistPreferences(state));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: this.prefersReducedMotion ? 'auto' : 'smooth' });
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.showBackToTop = window.scrollY > 600;
  }

  private createCursorElements(): void {
    if (window.innerWidth > 768 && !this.prefersReducedMotion) {
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
