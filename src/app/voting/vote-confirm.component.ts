import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionInformation } from './choose/model/selection-information';
import { Router } from '@angular/router';
import { VoteService } from '../service/vote.service';
import { VoteStateService } from '../state/vote-state.service';
import { VoteConfirmationInfoComponent } from './voting-confirmation-info/vote-confirmation-info.component';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-vote-confirm',
  standalone: true,
  imports: [
    CommonModule,
    VoteConfirmationInfoComponent,
    MatIcon,
    MatTooltip
  ],
  templateUrl: 'vote-confirm.component.html',
  styleUrls: ['vote-confirm.component.scss']
})
export class VoteConfirmComponent implements OnInit {
  selectionInformation!: SelectionInformation;

  submitted = false;
  cipher: string = '';
  error?: string;
  copied: boolean = false;

  constructor(
    private router: Router,
    private voteService: VoteService,
    private voteState: VoteStateService
  ) {}

  ngOnInit() {
    const selected = this.voteState.currentSelection;
    const preview = this.voteState.currentPreview;
    if (!selected || !preview) {
      this.router.navigate(['/choose']);
      return;
    }
    this.selectionInformation = selected;
    this.cipher = preview.ciphertext;
  }

  back() {
    this.voteState.clear();
    this.router.navigate(['/choose']);
  }

  confirm() {
    const preview = this.voteState.currentPreview;
    if (!preview) {
      this.error = 'Preview puudub, alustage uuesti.';
      return;
    }
    this.voteService.confirm(preview.previewToken)
      .subscribe({
        next: (res) => {
          this.cipher = res.cipher;
          this.voteState.setSavedCipher(res);
          this.submitted = true;
        },
        error: (err) => {
          console.error(err);
          this.error = 'Hääletamine ebaõnnestus, palun proovi uuesti.';
        }
      });
  }

  copy() {
    navigator.clipboard.writeText(this.cipher).then(() => {
      this.copied = true;
      setTimeout(() => this.copied = false, 2000);
    });
  }
}
