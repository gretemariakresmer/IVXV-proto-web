import { Routes } from '@angular/router';
import {VoteListComponent} from './vote/vote-list-component';

export const routes: Routes = [
  { path: 'votes', component: VoteListComponent },
  { path: '', redirectTo: '/votes', pathMatch: 'full' },
];
