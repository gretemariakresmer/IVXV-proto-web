import { Component, OnInit } from '@angular/core';
import { CommonModule }        from '@angular/common';
import { Router }              from '@angular/router';
import { VoteStateService }    from '../../state/vote-state.service';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-vote-confirmation-info',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    MatTooltip,
    MatTooltip
  ],
  templateUrl: './vote-confirmation-info.component.html',
  styleUrls:   ['./vote-confirmation-info.component.scss']
})
export class VoteConfirmationInfoComponent implements OnInit {
  cipher: string = '';
  copied: boolean = false;

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
    window.open('/bulletin-board', '_blank', 'noopener');
  }
}
