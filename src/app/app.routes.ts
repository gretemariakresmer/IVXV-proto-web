import { Routes } from '@angular/router';
import { AuthMethodSelectionComponent } from './authorization/auth-method-selection.component';
import { IntroductionComponent } from './introduction/introduction.component';

export const routes: Routes = [
  { path: '', component: AuthMethodSelectionComponent },
  { path: 'intro', component: IntroductionComponent }
];

export const steps = [
  { label: 'Sisenemine', path: '' },
  { label: 'Tutvustus', path: 'intro' },
  { label: 'Valiku tegemine', path: '/choose' },
  { label: 'E-hääletamine', path: '/vote' }
];
