import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './Session/login/login.component';
import { SignUpComponent } from './Session/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/landingPage',
    pathMatch: 'full',
  },
  { path: 'landingPage', component: LandingPageComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },{
    path:'home',component:HomeComponent
  },
  {path:'adminDashboard',component:AdminLayoutComponent,children:[
    {path:'header',component:AdminHeaderComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
