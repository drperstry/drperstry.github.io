import { Component, OnInit } from '@angular/core';

interface Product {
  name: string;
  description: string;
  icon: string;
  link: string;
  features: string[];
  category: string;
  type: 'chrome' | 'web';
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [
    {
      name: 'Auto Scroll',
      description: 'Automatically scroll through web pages with customizable speed and direction. Perfect for reading long articles, browsing social media feeds, or hands-free web browsing.',
      icon: 'fas fa-scroll',
      link: 'https://chromewebstore.google.com/detail/auto-scroll/pgogpmjdfnolmgihjemjakelopockkgo?authuser=0&hl=en',
      features: [
        'Adjustable scroll speed',
        'Pause/Resume functionality',
        'Smooth scrolling animation',
        'Works on any webpage'
      ],
      category: 'Chrome Extension',
      type: 'chrome'
    },
    {
      name: 'Popup Tabs Blocker',
      description: 'Block unwanted popup windows and tabs that websites try to open without your permission. Enjoy a cleaner, less intrusive browsing experience.',
      icon: 'fas fa-shield-alt',
      link: 'https://chromewebstore.google.com/detail/popup-tabs-blocker/nedokjbfgbfjcfabhdmbnfkibjebmfco?authuser=0&hl=en',
      features: [
        'Block popup tabs automatically',
        'Whitelist trusted sites',
        'Notification alerts',
        'Lightweight & fast'
      ],
      category: 'Chrome Extension',
      type: 'chrome'
    },
    {
      name: 'Work Item Notification',
      description: 'A notification system for Azure DevOps Work Items. Get real-time alerts and updates on work item changes, assignments, and status updates.',
      icon: 'fas fa-bell',
      link: 'https://work-item-notification.vercel.app',
      features: [
        'Real-time notifications',
        'Azure DevOps integration',
        'Customizable alerts',
        'Team collaboration'
      ],
      category: 'Web App',
      type: 'web'
    },
    {
      name: 'Family Site',
      description: 'A family management platform to organize events, share memories, and stay connected with loved ones. Keep your family organized and engaged.',
      icon: 'fas fa-users',
      link: 'https://family-site.vercel.app',
      features: [
        'Family event calendar',
        'Photo sharing',
        'Member profiles',
        'Communication hub'
      ],
      category: 'Web App',
      type: 'web'
    },
    {
      name: 'Almoosa Site',
      description: 'A professional website showcasing services and information. Built with modern technologies for optimal performance and user experience.',
      icon: 'fas fa-globe',
      link: 'https://almoosa-site.vercel.app',
      features: [
        'Modern design',
        'Responsive layout',
        'Fast performance',
        'SEO optimized'
      ],
      category: 'Web App',
      type: 'web'
    }
  ];

  constructor() { }

  ngOnInit(): void { }
}
