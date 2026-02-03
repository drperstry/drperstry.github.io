import { Component, OnInit } from '@angular/core';

interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
}

interface Skill {
  name: string;
  level: number;
  icon: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  roles: string[] = ['Senior Software Engineer', 'DevOps Engineer', 'CRM Specialist', 'Problem Solver'];
  currentRole = 0;
  displayedRole = '';
  isTyping = true;

  experiences: Experience[] = [
    {
      title: 'Senior Software Engineer',
      company: 'Albilad Bank',
      location: 'Riyadh',
      period: 'Apr 2025 - Present',
      description: [
        'Designed and implemented a custom notification system for Azure DevOps Work Items',
        'Improving user experience and expanding reporting and analytics capabilities',
        'Resolved security vulnerabilities, improving compliance and system stability',
        'Contributed in building CI/CD pipeline for CRM Platform',
        'Third level support for production issues'
      ],
      technologies: ['CRM Dynamics', 'Azure DevOps', 'React', 'JavaScript', '.NET Core', '.NET Framework', 'SQL Server', 'SSIS', 'SSRS', 'IBM MQ', 'HangFire']
    },
    {
      title: 'Software Engineer',
      company: 'Ejada & AL Rajhi Bank',
      location: 'Riyadh',
      period: 'Oct 2022 - Apr 2025',
      description: [
        'Implemented WCF services, custom activities, plugins, and customizations',
        'Designed and implemented a custom CI/CD pipeline for CRM Solutions',
        'Built operational and monitoring tools to track system health and perform administrative tasks',
        'Improved delivery quality by reviewing, identifying risks early, and recommending best practices'
      ],
      technologies: ['CRM Dynamics', 'Jira', 'Angular', 'JavaScript', '.NET Framework', 'SQL Server', 'SSIS', 'SSRS', 'IBM MQ']
    },
    {
      title: 'DevOps Engineer',
      company: 'Minthar',
      location: 'Riyadh',
      period: 'Jul 2024 - Oct 2024',
      description: [
        'Boilerplate for Bitbucket CI/CD in IIS',
        'ETL Job from scraping data using site APIs to transforming until loading into new Database',
        'Maintaining Cloud providers and SQL Cloud migration as well as other assets',
        'Automated Administrative tasks with SQL maintenance jobs and PowerShell scripts'
      ],
      technologies: ['AWS', 'Google Cloud', 'Jira', 'SQL Server', 'PowerShell', '.NET Core', 'React']
    },
    {
      title: 'Software Engineer Intern',
      company: 'Saudi Aramco',
      location: 'Dhahran',
      period: 'May 2021 - Aug 2021',
      description: [
        'Implementation of a desktop app and a website based on multiple department requirements'
      ],
      technologies: ['.NET', 'JavaScript', 'Access DB', 'SQL']
    }
  ];

  hardSkills: Skill[] = [
    { name: 'DevOps & CI/CD', level: 90, icon: 'fas fa-cogs' },
    { name: '.NET / C#', level: 95, icon: 'fab fa-microsoft' },
    { name: 'SQL & Data Analysis', level: 90, icon: 'fas fa-database' },
    { name: 'MS CRM Dynamics', level: 92, icon: 'fas fa-users-cog' },
    { name: 'JavaScript / TypeScript', level: 85, icon: 'fab fa-js' },
    { name: 'Web Development', level: 85, icon: 'fas fa-code' },
    { name: 'Cloud (AWS/Azure/GCP)', level: 80, icon: 'fas fa-cloud' },
    { name: 'Power BI', level: 75, icon: 'fas fa-chart-bar' }
  ];

  softSkills: string[] = ['Continuous Improvement', 'Discipline', 'Communication', 'Problem Solving', 'Team Leadership', 'Analytical Thinking'];

  constructor() { }

  ngOnInit(): void {
    this.typeRole();
  }

  typeRole(): void {
    const role = this.roles[this.currentRole];
    let charIndex = 0;
    this.displayedRole = '';
    this.isTyping = true;

    const typeInterval = setInterval(() => {
      if (charIndex < role.length) {
        this.displayedRole += role[charIndex];
        charIndex++;
      } else {
        clearInterval(typeInterval);
        this.isTyping = false;
        setTimeout(() => this.eraseRole(), 2000);
      }
    }, 100);
  }

  eraseRole(): void {
    const eraseInterval = setInterval(() => {
      if (this.displayedRole.length > 0) {
        this.displayedRole = this.displayedRole.slice(0, -1);
      } else {
        clearInterval(eraseInterval);
        this.currentRole = (this.currentRole + 1) % this.roles.length;
        setTimeout(() => this.typeRole(), 500);
      }
    }, 50);
  }
}
