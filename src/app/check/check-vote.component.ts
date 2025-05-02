import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BulletinBoardService } from '../service/bulletin-board.service';

@Component({
  selector: 'app-vote-check',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: 'check-vote.component.html'
})
export class CheckVoteComponent {
  hashInput = '';
  checked = false;
  found   = false;
  constructor(private bb: BulletinBoardService) {}

  check() {
    this.bb.listChain().subscribe(chain => {
      this.checked = true;
      this.found   = chain.some(b => b.cipherHash === this.hashInput);
    });
  }
}
