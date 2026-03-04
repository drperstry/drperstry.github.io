import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  roles: string[] = [];
  currentRole = 0;
  displayedRole = '';
  isTyping = true;
  experiences: any[] = [];
  hardSkills: any[] = [];
  softSkills: string[] = [];
  stats: any[] = [];

  private destroy$ = new Subject<void>();
  private typingInterval: any;
  private eraseInterval: any;
  private typingTimeout: any;
  private eraseTimeout: any;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.loadContent();
    this.translate.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.loadContent());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.clearAllTimers();
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
    ]).subscribe(data => {
      this.experiences = data['experience.items'] || [];
      this.hardSkills = data['skills.hardSkills'] || [];
      this.softSkills = data['skills.softSkills'] || [];
      this.stats = data['about.stats'] || [];

      // Always reset and restart typing animation on language change
      this.roles = data['hero.roles'] || [];
      this.currentRole = 0;
      this.displayedRole = '';
      this.typeRole();
    });
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
        clearInterval(this.typingInterval);
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
        clearInterval(this.eraseInterval);
        this.eraseInterval = null;
        this.currentRole = (this.currentRole + 1) % this.roles.length;
        this.typingTimeout = setTimeout(() => this.typeRole(), 500);
      }
    }, 50);
  }
}
