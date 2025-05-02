import { Component, OnInit } from '@angular/core';
import { BlockDto } from '../model/block-dto';
import { BulletinBoardService } from '../../service/bulletin-board.service';
import { DatePipe, NgForOf, NgIf } from '@angular/common';

@Component({
    templateUrl: 'bulletin-board.component.html',
    standalone: true,
  imports: [
    DatePipe,
    NgIf,
    NgForOf
  ],
    styleUrls: ['bulletin-board.component.scss']
  }
)
export class BulletinBoardComponent implements OnInit {
  chain: BlockDto[] = [];
  loading = false;
  error?: string;

  constructor(private bb: BulletinBoardService) {}

  ngOnInit() { this.loadChain(); }

  loadChain() {
    this.loading = true;
    this.bb.listChain().subscribe({
      next: data => this.chain = data,
      error: ()   => this.error = 'Laadimine ebaõnnestus.',
      complete: () => this.loading = false
    });
  }
}
