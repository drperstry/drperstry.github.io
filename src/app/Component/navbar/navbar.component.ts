import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState, Language, Theme } from '../../store/app.state';
import { setLanguage, toggleTheme } from '../../store/actions/app.actions';
import { selectLanguage, selectTheme } from '../../store/selectors/app.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isScrolled = false;
  isMobileMenuOpen = false;
  currentLang: Language = 'en';
  currentTheme: Theme = 'dark';
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
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 50;
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
      const navbarHeight = 80;
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      this.smoothScrollTo(targetPosition, 1000);
    }
  }

  private smoothScrollTo(targetPosition: number, duration: number): void {
    const startPosition = window.pageYOffset;
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
