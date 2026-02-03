import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();

  socialLinks = [
    { icon: 'fab fa-github', url: 'https://github.com/drperstry', label: 'GitHub' },
    { icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/in/abdulrahman-alhuwais/', label: 'LinkedIn' },
    { icon: 'fas fa-envelope', url: 'mailto:abdulrahmanhuwais@gmail.com', label: 'Email' },
    { icon: 'fab fa-whatsapp', url: 'https://wa.me/966503810471', label: 'WhatsApp' }
  ];

  constructor() { }

  ngOnInit(): void { }
}
