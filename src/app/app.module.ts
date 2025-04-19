import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthMethodSelectionComponent } from './authorization/auth-method-selection.component';
import { routes } from './app.routes';
import { StepProgressComponent } from './step-progress/step-progress.component';

@NgModule({
  declarations: [
    AuthMethodSelectionComponent
    // PinEntryDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AppComponent,
    StepProgressComponent,
  ],
  exports: [
    StepProgressComponent
  ],
  bootstrapApplication: [AppComponent]
})
export class AppModule { }
