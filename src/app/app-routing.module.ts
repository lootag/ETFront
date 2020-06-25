import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginErrorComponent } from './loginerror/loginerror.component';
import { SearchComponent } from './search/search.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {path: '', component: SubscribeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'loginerror', component: LoginErrorComponent},
  {path: 'search', component: SearchComponent},
  {path: 'checkout', component: CheckoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule
{
  constructor(private router: Router) { }

  redirectToLogin()
  {
    this.router.navigate(["login"]);
  }
}
