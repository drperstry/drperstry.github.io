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
    clearInterval(this.typingInterval);
    clearInterval(this.eraseInterval);
  }

  private loadContent(): void {
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

      const newRoles = data['hero.roles'] || [];
      if (JSON.stringify(newRoles) !== JSON.stringify(this.roles)) {
        this.roles = newRoles;
        this.currentRole = 0;
        this.displayedRole = '';
        clearInterval(this.typingInterval);
        clearInterval(this.eraseInterval);
        this.typeRole();
      }
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
        this.isTyping = false;
        setTimeout(() => this.eraseRole(), 2000);
      }
    }, 100);
  }

  eraseRole(): void {
    this.eraseInterval = setInterval(() => {
      if (this.displayedRole.length > 0) {
        this.displayedRole = this.displayedRole.slice(0, -1);
      } else {
        clearInterval(this.eraseInterval);
        this.currentRole = (this.currentRole + 1) % this.roles.length;
        setTimeout(() => this.typeRole(), 500);
      }
    }, 50);
  }
}
