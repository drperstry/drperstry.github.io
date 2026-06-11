import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslatePipe } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { AppState, Language, Theme } from '../../store/app.state';
import { setLanguage, toggleTheme } from '../../store/actions/app.actions';
import { selectLanguage, selectTheme } from '../../store/selectors/app.selectors';

const SECTION_IDS = ['about', 'experience', 'skills'];
const NAVBAR_HEIGHT = 80;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [RouterLink, RouterLinkActive, TranslatePipe]
})
export class NavbarComponent implements OnInit, OnDestroy {
  isScrolled = false;
  isMobileMenuOpen = false;
  currentLang: Language = 'en';
  currentTheme: Theme = 'dark';
  scrollProgress = 0;
  activeSection = '';
  isHomeRoute = true;

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private store: Store<{ app: AppState }>
  ) {}

  ngOnInit(): void {
    this.store.select(selectLanguage)
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => this.currentLang = lang);

    this.store.select(selectTheme)
      .pipe(takeUntil(this.destroy$))
      .subscribe(theme => this.currentTheme = theme);

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd), takeUntil(this.destroy$))
      .subscribe(() => {
        this.isHomeRoute = this.router.url === '/' || this.router.url.startsWith('/#');
        this.updateScrollState();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateScrollState();
  }

  private updateScrollState(): void {
    this.isScrolled = window.scrollY > 50;

    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress = scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0;

    this.activeSection = this.isHomeRoute ? this.findActiveSection() : '';
  }

  private findActiveSection(): string {
    let active = '';
    for (const id of SECTION_IDS) {
      const element = document.getElementById(id);
      if (element && element.getBoundingClientRect().top <= NAVBAR_HEIGHT + 100) {
        active = id;
      }
    }
    return active;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  switchLanguage(): void {
    const newLang: Language = this.currentLang === 'en' ? 'ar' : 'en';
    this.store.dispatch(setLanguage({ language: newLang }));
  }

  switchTheme(): void {
    this.store.dispatch(toggleTheme());
  }

  scrollToSection(sectionId: string): void {
    this.closeMobileMenu();
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => this.performScroll(sectionId), 150);
      });
    } else {
      this.performScroll(sectionId);
    }
  }

  private performScroll(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const targetPosition = element.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
      this.smoothScrollTo(targetPosition, 1000);
    }
  }

  private smoothScrollTo(targetPosition: number, duration: number): void {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo(0, targetPosition);
      return;
    }

    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const easeInOutCubic = (t: number): number =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  }
}
