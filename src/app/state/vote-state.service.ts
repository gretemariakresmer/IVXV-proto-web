import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SelectionInformation } from '../voting/choose/model/selection-information';
import { VoteResponse } from '../voting/choose/model/vote-response';

@Injectable({ providedIn: 'root' })
export class VoteStateService {
  private readonly _selection$ = new BehaviorSubject<SelectionInformation | null>(null);
  private readonly _savedCipher$ = new BehaviorSubject<VoteResponse | null>(null)

  get selection$(): Observable<SelectionInformation | null> {
    return this._selection$.asObservable();
  }

  get currentSelection(): SelectionInformation | null {
    return this._selection$.getValue();
  }

  setSelection(selection: SelectionInformation): void {
    this._selection$.next(selection);
  }

  clear(): void {
    this._selection$.next(null);
  }

  setSavedCipher(saved: VoteResponse): void {
    this._savedCipher$.next(saved);
  }

  get savedCipher(): VoteResponse | null {
    return this._savedCipher$.getValue();
  }
}
