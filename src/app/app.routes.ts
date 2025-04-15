import { Routes } from '@angular/router';
import { VoteListComponent } from './vote/vote-list-component';
import { AuthMethodSelectionComponent } from './authorization/auth-method-selection.component';

export const routes: Routes = [
  { path: '', component: AuthMethodSelectionComponent },
  { path: 'votes', component: VoteListComponent },
];
