import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface ContactMethod {
  icon: string;
  title: string;
  value: string;
  link: string;
  color: string;
  dir?: 'ltr';
}

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss'],
  imports: [ReactiveFormsModule, TranslatePipe]
})
export class ContactMeComponent implements OnInit, OnDestroy {
  contactForm!: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  contactMethods: ContactMethod[] = [];
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private translate: TranslateService) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.loadMethods();
    this.translate.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.loadMethods());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  isExternal(method: ContactMethod): boolean {
    return method.link.startsWith('http');
  }

  private loadMethods(): void {
    this.translate.get('contact.methods')
      .pipe(takeUntil(this.destroy$))
      .subscribe(methods => {
        this.contactMethods = Array.isArray(methods) ? methods : [];
      });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const { name, email, subject, message } = this.contactForm.value;
    const mailtoLink = `mailto:abdulrahmanhuwais@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    window.location.href = mailtoLink;

    setTimeout(() => {
      this.isSubmitting = false;
      this.submitSuccess = true;
      this.contactForm.reset();
      setTimeout(() => this.submitSuccess = false, 5000);
    }, 1000);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }
}
