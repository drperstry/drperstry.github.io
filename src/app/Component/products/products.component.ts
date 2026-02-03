import { Component, OnInit } from '@angular/core';

interface Product {
  name: string;
  description: string;
  icon: string;
  link: string;
  features: string[];
  category: string;
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
      category: 'Productivity'
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
      category: 'Security'
    }
  ];

  constructor() { }

  ngOnInit(): void { }
}
