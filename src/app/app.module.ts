import { LOCALE_ID, NgModule } from '@angular/core';
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
import { PartyDropdownComponent } from './voting/choose/party-dropdown/party-dropdown.component';
import { SelectionInformationComponent } from './voting/selection-information/selection-information.component';
import { ChoosePageComponent } from './voting/choose/choose-page.component';


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
    IdCardPinEntryComponent,
    PartyDropdownComponent,
    SelectionInformationComponent,
    ChoosePageComponent
  ],
  exports: [
    StepProgressComponent
  ],
  bootstrapApplication: [AppComponent],
  providers: [
    { provide: LOCALE_ID, useValue: 'et-EE'}
  ]
})

export class AppModule { }
