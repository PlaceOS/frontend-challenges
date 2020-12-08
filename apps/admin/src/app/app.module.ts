import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@frontend-challenges/shared';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, AdminLoginComponent, AdminMainComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AdminRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
