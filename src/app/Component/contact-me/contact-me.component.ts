import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface ContactMethod {
  icon: string;
  title: string;
  value: string;
  link: string;
  color: string;
}

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  contactMethods: ContactMethod[] = [
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      value: 'abdulrahmanhuwais@gmail.com',
      link: 'mailto:abdulrahmanhuwais@gmail.com',
      color: '#ea4335'
    },
    {
      icon: 'fab fa-linkedin-in',
      title: 'LinkedIn',
      value: 'Abdulrahman Alhuwais',
      link: 'https://www.linkedin.com/in/abdulrahman-alhuwais/',
      color: '#0077b5'
    },
    {
      icon: 'fab fa-github',
      title: 'GitHub',
      value: 'drperstry',
      link: 'https://github.com/drperstry',
      color: '#333'
    },
    {
      icon: 'fab fa-whatsapp',
      title: 'WhatsApp',
      value: '+966 503 810 471',
      link: 'https://wa.me/966503810471',
      color: '#25d366'
    },
    {
      icon: 'fas fa-phone',
      title: 'Phone',
      value: '+966 503 810 471',
      link: 'tel:+966503810471',
      color: '#6366f1'
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Location',
      value: 'Riyadh, Saudi Arabia',
      link: 'https://maps.google.com/?q=Riyadh,Saudi+Arabia',
      color: '#f59e0b'
    }
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;

    // Simulate form submission (since we don't have a backend)
    // In production, you would send this to an actual email service
    const formData = this.contactForm.value;
    const mailtoLink = `mailto:abdulrahmanhuwais@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;

    // Open mailto link
    window.location.href = mailtoLink;

    setTimeout(() => {
      this.isSubmitting = false;
      this.submitSuccess = true;
      this.contactForm.reset();

      setTimeout(() => {
        this.submitSuccess = false;
      }, 5000);
    }, 1000);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.contactForm.controls).forEach(key => {
      this.contactForm.get(key)?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    if (field.errors['email']) return 'Please enter a valid email address';
    if (field.errors['minlength']) return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${field.errors['minlength'].requiredLength} characters`;

    return '';
  }
}
