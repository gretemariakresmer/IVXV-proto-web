import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MatButton} from '@angular/material/button';

import { AppComponent } from './app.component';
import { AuthMethodSelectionComponent } from './authorization/auth-method-selection.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AuthMethodSelectionComponent,
    // PinEntryDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AppComponent,
    MatButton,
  ],
  bootstrapApplication: [AppComponent]
})
export class AppModule { }
