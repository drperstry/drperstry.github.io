import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  styleUrls: ['./products.component.scss'],
  imports: [RouterLink, TranslatePipe]
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  private destroy$ = new Subject<void>();

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.translate.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.loadProducts());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadProducts(): void {
    this.translate.get('products.items')
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => {
        this.products = Array.isArray(items) ? items : [];
      });
  }
}
