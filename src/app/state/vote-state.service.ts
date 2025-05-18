import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SelectionInformation } from '../voting/choose/model/selection-information';
import { VoteResponse } from '../voting/choose/model/vote-response';
import { EncryptPreviewDto } from '../voting/choose/model/encrypt-preview-dto';

@Injectable({ providedIn: 'root' })
export class VoteStateService {
  private readonly _selection$ = new BehaviorSubject<SelectionInformation | null>(null);
  private readonly _preview$ = new BehaviorSubject<EncryptPreviewDto | null>(null);
  private readonly _savedCipher$ = new BehaviorSubject<VoteResponse | null>(null);

  get currentSelection(): SelectionInformation | null {
    return this._selection$.getValue();
  }

  setSelection(selection: SelectionInformation): void {
    this._selection$.next(selection);
  }

  get currentPreview(): EncryptPreviewDto | null {
    return this._preview$.getValue();
  }

  setPreview(dto: EncryptPreviewDto) {
    this._preview$.next(dto);
  }

  clear(): void {
    this._selection$.next(null);
    this._preview$.next(null);
  }

  setSavedCipher(saved: VoteResponse): void {
    this._savedCipher$.next(saved);
  }

  get savedCipher(): VoteResponse | null {
    return this._savedCipher$.getValue();
  }
}
