import { Component, Output, EventEmitter } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'id-card-pin-entry',
  templateUrl: './id-card-pin-entry.component.html',
  styleUrls: ['./id-card-pin-entry.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class IdCardPinEntryComponent {
  pin = '';
  @Output() cancel = new EventEmitter<void>();
  @Output() submit = new EventEmitter<string>();

  onCancel()  { this.cancel.emit(); }
  onSubmit()  { if (this.pin) this.submit.emit(this.pin); }
}
