import { Component, OnInit } from '@angular/core';

interface Product {
  name: string;
  description: string;
  icon: string;
  link: string;
  features: string[];
  technologies: string[];
  category: string;
  type: 'chrome' | 'web' | 'python';
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
      technologies: ['JavaScript', 'Chrome APIs', 'HTML', 'CSS'],
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
      technologies: ['JavaScript', 'Chrome APIs', 'HTML', 'CSS'],
      category: 'Chrome Extension',
      type: 'chrome'
    },
    {
      name: 'Work Item Notification',
      description: 'A notification system for Azure DevOps Work Items. Get real-time alerts and updates on work item changes, assignments, and status updates.',
      icon: 'fas fa-bell',
      link: 'https://update-dev.vercel.app',
      features: [
        'Real-time notifications',
        'Azure DevOps integration',
        'Customizable alerts',
        'Team collaboration'
      ],
      technologies: ['React', 'TypeScript', 'Azure DevOps API', 'Vercel', 'Tailwind CSS'],
      category: 'Web App',
      type: 'web'
    },
    {
      name: 'Family Unit',
      description: 'A family management platform to organize events, share memories, and stay connected with loved ones. Keep your family organized and engaged.',
      icon: 'fas fa-users',
      link: '',
      features: [
        'Family event calendar',
        'Photo sharing',
        'Member profiles',
        'Communication hub'
      ],
      technologies: ['React', 'Next.js', 'TypeScript', 'Vercel', 'Tailwind CSS'],
      category: 'Web App',
      type: 'web'
    },
    {
      name: 'Almoosa Family Site',
      description: 'A professional website showcasing services and information. Built with modern technologies for optimal performance and user experience.',
      icon: 'fas fa-globe',
      link: 'https://almoosa-family.vercel.app',
      features: [
        'Modern design',
        'Responsive layout',
        'Fast performance',
        'SEO optimized'
      ],
      technologies: ['React', 'Next.js', 'TypeScript', 'Vercel', 'Tailwind CSS'],
      category: 'Web App',
      type: 'web'
    },
    {
      name: 'Detect & Port Scanner',
      description: 'Network security tool that identifies port scanning activity by monitoring for 15 or more consecutive ports within a 5 second window from a single source.',
      icon: 'fas fa-network-wired',
      link: 'https://github.com/drperstry/SimpleTools/tree/master/Detect%26PortScanner',
      features: [
        'Port scan detection',
        'Real-time monitoring',
        'Configurable thresholds',
        'Security logging'
      ],
      technologies: ['Python', 'Networking', 'Socket Programming'],
      category: 'Python Tool',
      type: 'python'
    },
    {
      name: 'GPA Calculator',
      description: 'Academic tool that processes course records with weights and letter grades to compute GPA accurately.',
      icon: 'fas fa-graduation-cap',
      link: 'https://github.com/drperstry/SimpleTools/tree/master/GPA_calculator',
      features: [
        'Weighted GPA calculation',
        'Multiple grading scales',
        'Course credit handling',
        'File-based input'
      ],
      technologies: ['Python', 'File Processing', 'Mathematics'],
      category: 'Python Tool',
      type: 'python'
    },
    {
      name: 'K-Anonymization',
      description: 'Data privacy implementation applying the K-Anonymization algorithm for anonymizing datasets and protecting sensitive information.',
      icon: 'fas fa-user-secret',
      link: 'https://github.com/drperstry/SimpleTools/tree/master/K-Anonymization',
      features: [
        'Dataset anonymization',
        'Privacy protection',
        'Configurable K values',
        'Data generalization'
      ],
      technologies: ['Python', 'Data Privacy', 'Algorithms'],
      category: 'Python Tool',
      type: 'python'
    },
    {
      name: 'PicSteg',
      description: 'Image steganography application with Hide/Unhide modes for embedding and extracting secret data within images.',
      icon: 'fas fa-image',
      link: 'https://github.com/drperstry/SimpleTools/tree/master/PicSteg',
      features: [
        'Hide data in images',
        'Extract hidden data',
        'Multiple image formats',
        'Secure encoding'
      ],
      technologies: ['Python', 'Steganography', 'Image Processing', 'PIL'],
      category: 'Python Tool',
      type: 'python'
    },
    {
      name: 'Bulk Delay Subtitle',
      description: 'SRT subtitle file processor for adjusting timing by adding or subtracting delays to sync subtitles with video.',
      icon: 'fas fa-closed-captioning',
      link: 'https://github.com/drperstry/SimpleTools/tree/master/bulk-delay%20Subtitle',
      features: [
        'Subtitle time adjustment',
        'Bulk processing',
        'SRT format support',
        'Positive/negative delays'
      ],
      technologies: ['Python', 'File Processing', 'Regular Expressions'],
      category: 'Python Tool',
      type: 'python'
    }
  ];

  constructor() { }

  ngOnInit(): void { }
}
