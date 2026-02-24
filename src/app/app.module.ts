import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Component/home/home.component';
import { ContactMeComponent } from './Component/contact-me/contact-me.component';
import { ProductsComponent } from './Component/products/products.component';
import { NavbarComponent } from './Component/navbar/navbar.component';
import { FooterComponent } from './Component/footer/footer.component';
import { appReducer } from './store/reducers/app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactMeComponent,
    ProductsComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({ app: appReducer }),
    TranslateModule.forRoot({ defaultLanguage: 'en' })
  ],
  providers: [
    provideTranslateHttpLoader({ prefix: './assets/i18n/', suffix: '.json' })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
