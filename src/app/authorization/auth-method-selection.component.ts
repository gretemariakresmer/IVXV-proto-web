import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-method-selection',
  templateUrl: './auth-method-selection.component.html',
  styleUrls: ['./auth-method-selection.component.scss'],

})
export class AuthMethodSelectionComponent {
  selectedMethod: 'id' | 'mobile' | 'smartId' | null = null;

  selectMethod(method: 'id' | 'mobile' | 'smartId') {
    this.selectedMethod = method;
  }
}
