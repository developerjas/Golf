import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { OrderIndexComponent } from './Components/order-create/order-index/order-index.component';
import { OrderCreateComponent } from './Components/order-create/order-create.component';
import { SidebarComponent } from './Shared/Sidebar/sidebar.component';
import { CsvComponent } from './Components/order-create/csv/csv.component';

import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OrderService } from './Shared/_services/order.service';
import { ExcelService } from './Shared/_services/csv.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AuthInterceptorService } from './Shared/_services/auth.interceptor.service';
import { AuthGuard } from './Shared/_guards';

const appRoutes: Routes = [
    { path: '', redirectTo: "/order-create", pathMatch: 'full' },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'order-create',
        component: OrderCreateComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'order-Index',
        component: OrderIndexComponent,
        canActivate: [AuthGuard],},
    {
        path: 'csv',
        component: CsvComponent,
        canActivate: [AuthGuard],
    },
]

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    OrderIndexComponent,
    OrderCreateComponent,
    CsvComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    OrderService,
    ExcelService,
    {
      provide:
        HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
