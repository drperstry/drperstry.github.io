import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Component/home/home.component';
import { ContactMeComponent } from './Component/contact-me/contact-me.component';
import { ProjectsComponent } from './Component/projects/projects.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NavbarComponent} from './Component/navbar/navbar.component';
import { FooterComponent } from './Component/footer/footer.component';
import { SocialcardsComponent } from './Component/contact-me/socialcards/socialcards.component'
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactMeComponent,
    ProjectsComponent,
    NavbarComponent,
    FooterComponent,
    SocialcardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
