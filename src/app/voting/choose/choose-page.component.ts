import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router }    from '@angular/router';
import { PartyDropdownComponent } from './party-dropdown/party-dropdown.component';
import { SelectionInformationComponent } from '../selection-information/selection-information.component';
import { ElectionInfoComponent } from './voting-information/voting-information.component';
import { SelectionInformation } from './model/selection-information';
import { VoteStateService } from '../../state/vote-state.service';

@Component({
  selector: 'app-choose-page',
  standalone: true,
  imports: [CommonModule, PartyDropdownComponent, SelectionInformationComponent, ElectionInfoComponent],
  templateUrl: 'choose-page.component.html',
  styleUrls: ['./choose-page.component.scss']
})
export class ChoosePageComponent {
  currentDistrict = 'Eesti';
  currentConstituency = 'Valimisringkond nr.1';

  selection?: SelectionInformation;

  constructor(private router: Router,
              private voteState: VoteStateService) {}

  onPick(selection: SelectionInformation) {
    this.selection = selection;
  }
  onCancel() {
    this.selection = undefined;
    this.router.navigate([''])
  }

  onConfirm() {
    if (!this.selection) {
      return;
    }
    this.voteState.setSelection(this.selection)
    this.router.navigate(['/vote']);
  }

  getSelectedPerson() {
    return this.selection?.person;
  }

  getSelectedParty() {
    return this.selection?.partyName;
  }
}
