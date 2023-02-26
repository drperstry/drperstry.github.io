import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent implements OnInit {

  constructor(private router: Router) { }

  social_icons = [
    {
      class: 'fa-whatsapp',
      link: 'https://wa.me/966503810471'
    },
    {
      class: 'fa-at',
      link: 'mailto:abdulrahmanhuwais@gmail.com'
    },
    {
      class: 'fa-linkedin',
      link: 'https://www.linkedin.com/in/abdulrahman-alhuwais/'
    },
    {
      class: 'fa-github',
      link: 'https://github.com/drperstry'
    }
  ];

  ngOnInit(): void {
  }

}
