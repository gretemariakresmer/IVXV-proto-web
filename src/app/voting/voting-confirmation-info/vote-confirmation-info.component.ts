import { Component, OnInit } from '@angular/core';
import { CommonModule }        from '@angular/common';
import { Router }              from '@angular/router';
import { VoteStateService }    from '../../state/vote-state.service';

@Component({
  selector: 'app-vote-confirmation-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vote-confirmation-info.component.html',
  styleUrls:   ['./vote-confirmation-info.component.scss']
})
export class VoteConfirmationInfoComponent implements OnInit {
  cipher?: string;

  constructor(
    private voteState: VoteStateService,
    private router:    Router
  ) {}

  ngOnInit(): void {
    this.cipher = this.voteState.savedCipher?.cipher ?? '';
  }

  close(): void {
    this.router.navigate(['/']);
  }

  openCheck(): void {
    window.open('/check', '_blank', 'noopener');
  }

  openBulletin(): void {
    window.open('/bulletin', '_blank', 'noopener');
  }
}
