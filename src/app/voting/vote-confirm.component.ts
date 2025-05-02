import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionInformation } from './choose/model/selection-information';
import { Router } from '@angular/router';
import { VoteService } from '../service/vote.service';
import { VoteStateService } from '../state/vote-state.service';
import { VoteConfirmationInfoComponent } from './voting-confirmation-info/vote-confirmation-info.component';

@Component({
  selector: 'app-vote-confirm',
  standalone: true,
  imports: [
    CommonModule,
    VoteConfirmationInfoComponent
  ],
  templateUrl: 'vote-confirm.component.html',
  styleUrls: ['vote-confirm.component.scss']
})
export class VoteConfirmComponent implements OnInit {
  selectionInformation!: SelectionInformation;

  submitted = false;
  cipher?: string;
  error?: string;

  constructor(
    private router: Router,
    private voteService: VoteService,
    private voteState: VoteStateService
  ) {}

  ngOnInit() {
    const state = this.voteState.currentSelection;
    if (!state) {
      this.router.navigate(['/choose']);
      return;
    }
    this.selectionInformation = state;
  }

  back() {
    this.router.navigate(['/choose']);
  }

  confirm() {
    this.voteService.submitVote(this.selectionInformation)
      .subscribe({
        next: (res) => {
          this.cipher    = res.cipher;
          this.voteState.setSavedCipher(res);
          this.submitted = true;
        },
        error: (err) => {
          console.error(err);
          this.error = 'Hääletamine ebaõnnestus, palun proovi uuesti.';
        }
      });
  }
}
