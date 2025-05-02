import { Routes } from '@angular/router';
import { AuthMethodSelectionComponent } from './authorization/auth-method-selection.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { ChoosePageComponent } from './voting/choose/choose-page.component';
import { VoteConfirmComponent } from './voting/vote-confirm.component';
import { VoteConfirmationInfoComponent } from './voting/voting-confirmation-info/vote-confirmation-info.component';
import { CheckVoteComponent } from './check/check-vote.component';
import { BulletinBoardComponent } from './check/bulletin-board/bulletin-board.component';

export const routes: Routes = [
  { path: '', component: AuthMethodSelectionComponent },
  { path: 'intro', component: IntroductionComponent },
  { path: 'choose', component: ChoosePageComponent },
  { path: 'vote', component: VoteConfirmComponent },
  { path: 'vote/confirmed', component: VoteConfirmationInfoComponent },
  { path: 'check', component: CheckVoteComponent },
  { path: 'bulletin', component: BulletinBoardComponent }
];

export const steps = [
  { label: 'Sisenemine', path: '' },
  { label: 'Tutvustus', path: 'intro' },
  { label: 'Valiku tegemine', path: 'choose' },
  { label: 'E-hääletamine', path: 'vote' }
];
