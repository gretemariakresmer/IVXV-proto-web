import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartyDropdownComponent } from './party-dropdown/party-dropdown.component';
import { SelectionInformationComponent } from './selection-information/selection-information.component';
import { Person } from './model/person';
import { ElectionInfoComponent } from './voting-information/voting-information.component';
import { SelectionInformation } from './model/selection-information';

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

  selectedPerson?: Person;
  selectedParty?: String;

  onPick(selection: SelectionInformation) {
    this.selectedPerson = selection.person;
    this.selectedParty = selection.partyName;
  }
  onCancel() {
    this.selectedPerson = undefined;
  }
  onConfirm(p: Person) {
    console.log('Confirmed:', p);
  }
}
