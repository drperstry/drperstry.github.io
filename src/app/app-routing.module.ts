import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { ContactMeComponent } from './Component/contact-me/contact-me.component';
import { ProductsComponent } from './Component/products/products.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactMeComponent },
  { path: 'products', component: ProductsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
