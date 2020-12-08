import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { NgModule } from '@angular/core';
import { SharedModule } from '@frontend-challenges/shared';
import { ClientRoutingModule } from './client-routing.module';
import { AppComponent } from './app.component';
import { ClientMainComponent } from './client-main/client-main.component';
import { ClientLoginComponent } from './client-login/client-login.component';

@NgModule({
  declarations: [AppComponent, ClientMainComponent, ClientLoginComponent],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    SharedModule,
    ClientRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
