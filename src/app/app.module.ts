import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { LoginErrorComponent } from './loginerror/loginerror.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoaderComponent } from './loader/loader.component';
import { ThanksComponent } from './thanks/thanks.component';
import { NofilingsComponent } from './nofilings/nofilings.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchComponent,
    SubscribeComponent,
    LoginErrorComponent,
    CheckoutComponent,
    LoaderComponent,
    ThanksComponent,
    NofilingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgbModule,
    Ng2SmartTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
