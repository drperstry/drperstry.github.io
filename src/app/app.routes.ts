import { Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { ContactMeComponent } from './Component/contact-me/contact-me.component';
import { ProductsComponent } from './Component/products/products.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactMeComponent },
  { path: 'products', component: ProductsComponent },
  { path: '**', redirectTo: '' }
];
