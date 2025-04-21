import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthMethodSelectionComponent } from './authorization/auth-method-selection.component';
import { routes } from './app.routes';
import { StepProgressComponent } from './step-progress/step-progress.component';
import { IdCardPinEntryComponent } from './authorization/id-card-auth/id-card-pin-entry.component';
import { ConnectionScreenComponent } from './authorization/connection/connection-screen.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ConnectionScreenComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AppComponent,
    CommonModule,
    StepProgressComponent,
    AuthMethodSelectionComponent,
    IdCardPinEntryComponent
  ],
  exports: [
    StepProgressComponent
  ],
  bootstrapApplication: [AppComponent]
})

export class AppModule { }
