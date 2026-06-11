import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, NgZone, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
}

interface HardSkill {
  name: string;
  level: number;
  icon: string;
}

interface Stat {
  label: string;
  prefix: string;
  suffix: string;
  target: number;
  current: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [RouterLink, TranslatePipe]
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  roles: string[] = [];
  currentRole = 0;
  displayedRole = '';
  isTyping = true;
  experiences: Experience[] = [];
  hardSkills: HardSkill[] = [];
  softSkills: string[] = [];
  stats: Stat[] = [];
  statsRevealed = false;
  skillsRevealed = false;

  private destroy$ = new Subject<void>();
  private typingInterval: ReturnType<typeof setInterval> | null = null;
  private eraseInterval: ReturnType<typeof setInterval> | null = null;
  private typingTimeout: ReturnType<typeof setTimeout> | null = null;
  private eraseTimeout: ReturnType<typeof setTimeout> | null = null;
  private revealObserver: IntersectionObserver | null = null;

  constructor(
    private translate: TranslateService,
    private host: ElementRef<HTMLElement>,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.loadContent();
    this.translate.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.loadContent());
  }

  ngAfterViewInit(): void {
    if (!('IntersectionObserver' in window)) {
      this.statsRevealed = true;
      this.skillsRevealed = true;
      this.stats.forEach(stat => stat.current = stat.target);
      return;
    }

    this.revealObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        this.revealObserver?.unobserve(entry.target);
        this.zone.run(() => this.reveal(entry.target));
      }
    }, { threshold: 0.3 });

    const statsEl = this.host.nativeElement.querySelector('.about-stats');
    const skillsEl = this.host.nativeElement.querySelector('.skills-grid');
    if (statsEl) this.revealObserver.observe(statsEl);
    if (skillsEl) this.revealObserver.observe(skillsEl);
  }

  // IntersectionObserver does not fire when an instant jump (End key,
  // "back to top" history restore) skips straight past a section, so a
  // scroll check backs it up.
  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (this.statsRevealed && this.skillsRevealed) return;
    for (const selector of ['.about-stats', '.skills-grid']) {
      const el = this.host.nativeElement.querySelector(selector);
      if (el && el.getBoundingClientRect().top < window.innerHeight) {
        this.reveal(el);
      }
    }
  }

  private reveal(target: Element): void {
    if (target.classList.contains('about-stats')) {
      if (!this.statsRevealed) {
        this.statsRevealed = true;
        this.animateCounters();
      }
    } else if (!this.skillsRevealed) {
      this.skillsRevealed = true;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.clearAllTimers();
    this.revealObserver?.disconnect();
  }

  private clearAllTimers(): void {
    if (this.typingInterval) clearInterval(this.typingInterval);
    if (this.eraseInterval) clearInterval(this.eraseInterval);
    if (this.typingTimeout) clearTimeout(this.typingTimeout);
    if (this.eraseTimeout) clearTimeout(this.eraseTimeout);
    this.typingInterval = null;
    this.eraseInterval = null;
    this.typingTimeout = null;
    this.eraseTimeout = null;
  }

  private loadContent(): void {
    // Clear all timers first to prevent multiple animations
    this.clearAllTimers();

    this.translate.get([
      'hero.roles',
      'experience.items',
      'skills.hardSkills',
      'skills.softSkills',
      'about.stats'
    ]).pipe(takeUntil(this.destroy$)).subscribe(data => {
      // The translation stream can emit more than once (fallback load, then
      // language load) — stop any animation started by a previous emission.
      this.clearAllTimers();

      this.experiences = data['experience.items'] || [];
      // Levels are stored as strings: ngx-translate only round-trips
      // string leaf values and drops numbers from translation objects.
      this.hardSkills = (data['skills.hardSkills'] || []).map(
        (skill: { name: string; level: string; icon: string }) => ({
          ...skill,
          level: Number(skill.level) || 0
        })
      );
      this.softSkills = data['skills.softSkills'] || [];
      this.stats = (data['about.stats'] || []).map((stat: { value: string; label: string }) =>
        this.parseStat(stat)
      );
      if (this.statsRevealed) this.animateCounters();

      // Always reset and restart typing animation on language change
      this.roles = data['hero.roles'] || [];
      this.currentRole = 0;
      this.displayedRole = '';
      this.typeRole();
    });
  }

  private parseStat(stat: { value: string; label: string }): Stat {
    const match = stat.value.match(/^(\D*)(\d+)(\D*)$/);
    return {
      label: stat.label,
      prefix: match?.[1] ?? '',
      suffix: match?.[3] ?? '',
      target: match ? parseInt(match[2], 10) : 0,
      current: 0
    };
  }

  private animateCounters(): void {
    const duration = 1200;
    const start = performance.now();
    const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = easeOutCubic(progress);
      this.stats.forEach(stat => stat.current = Math.round(stat.target * eased));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }

  typeRole(): void {
    if (!this.roles.length) return;
    const role = this.roles[this.currentRole];
    let charIndex = 0;
    this.displayedRole = '';
    this.isTyping = true;

    this.typingInterval = setInterval(() => {
      if (charIndex < role.length) {
        this.displayedRole += role[charIndex];
        charIndex++;
      } else {
        if (this.typingInterval) clearInterval(this.typingInterval);
        this.typingInterval = null;
        this.isTyping = false;
        this.eraseTimeout = setTimeout(() => this.eraseRole(), 2000);
      }
    }, 100);
  }

  eraseRole(): void {
    this.eraseInterval = setInterval(() => {
      if (this.displayedRole.length > 0) {
        this.displayedRole = this.displayedRole.slice(0, -1);
      } else {
        if (this.eraseInterval) clearInterval(this.eraseInterval);
        this.eraseInterval = null;
        this.currentRole = (this.currentRole + 1) % this.roles.length;
        this.typingTimeout = setTimeout(() => this.typeRole(), 500);
      }
    }, 50);
  }
}
