import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-connection-screen',
  templateUrl: './connection-screen.component.html',
  styleUrls: ['./connection-screen.component.scss']
})
export class ConnectionScreenComponent {
  @Output() cancel = new EventEmitter<void>();
  onCancel() { this.cancel.emit(); }
}
