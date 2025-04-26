import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Person } from '../model/person';

@Component({
  selector: 'app-selection-information',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'selection-information.component.html',
  styleUrls: ['selection-information.component.scss']
})
export class SelectionInformationComponent {
  @Input() person?: Person;
  @Input() partyName?: String;
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<Person>();
}
