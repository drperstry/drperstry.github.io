import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { ContactMeComponent } from './Component/contact-me/contact-me.component';
import { ProjectsComponent } from './Component/projects/projects.component';
import { MyPlayGroundComponent } from './Component/my-play-ground/my-play-ground.component';
const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'contact-me', component: ContactMeComponent },
  {path: 'projects', component: ProjectsComponent},
  {path: 'my-play-ground', component: MyPlayGroundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
