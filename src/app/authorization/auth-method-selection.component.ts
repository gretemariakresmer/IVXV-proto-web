import {Component} from '@angular/core';
import {SignInMethod} from './model/sign-in-method';
import {MethodOption} from './model/method-option';
import {CommonModule} from '@angular/common';
import {IdCardPinEntryComponent} from './id-card-auth/id-card-pin-entry.component';
import {MobileIdEntryComponent} from './mobile-id-auth/mobile-id-pin-entry.component';

@Component({
  selector: 'app-auth-method-selection',
  templateUrl: './auth-method-selection.component.html',
  styleUrls: ['./auth-method-selection.component.scss'],
  standalone: true,
  imports: [CommonModule, IdCardPinEntryComponent, MobileIdEntryComponent]
})
export class AuthMethodSelectionComponent {
  methods: MethodOption[] = [
    { label: 'ID-kaart', type: SignInMethod.ID_CARD },
    { label: 'Mobiil-ID', type: SignInMethod.MOBILE_ID }
  ];

  selectedMethod?: SignInMethod;
  selectMethod(method: SignInMethod) {
    this.selectedMethod = method;
  }

  onPinCancel() {
    this.selectedMethod = undefined;
  }

  onPinSubmit() {
  }

  protected readonly SignInMethod = SignInMethod;
}
