import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';

@Component({
  selector: 'mobile-id-entry',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mobile-id-pin-entry.component.html',
  styleUrls: ['./mobile-id-pin-entry.component.scss']
})
export class MobileIdEntryComponent {
  phone: string  = '+372';
  idCode: string = '';

  @Output() cancel = new EventEmitter<void>();
  @Output() submit = new EventEmitter<{ phone: string; idCode: string }>();

  onCancel() {
    this.cancel.emit();
  }
}
