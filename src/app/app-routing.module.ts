import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactMeComponent } from './contact-me/contact-me.component';
// import { ProjectsComponent } from './projects/projects.component';
// import { MyPlayGroundComponent } from './my-play-ground/my-play-ground.component';
const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'contact-me', component: ContactMeComponent },
  // {path: 'Projects', component: ProjectsComponent},
  // {path: 'my-play-ground', component: MyPlayGroundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
