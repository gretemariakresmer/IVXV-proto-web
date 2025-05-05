import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule }       from '@angular/forms';
import { NgForOf, NgIf }     from '@angular/common';
import { BlockDto } from './model/block-dto';
import { SearchComponent } from './search/search.component';
import { Title } from '@angular/platform-browser';
import { VoteService } from '../service/vote.service';
import { MatIcon } from '@angular/material/icon';
import { DiffPiece } from './model/diff-piece';

@Component({
  selector: 'app-check-vote',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgForOf,
    NgIf,
    SearchComponent,
    MatIcon
  ],
  templateUrl: './check-vote.component.html',
  styleUrls: ['./check-vote.component.scss']
})
export class CheckVoteComponent implements OnInit {
  latest: BlockDto[] = [];
  filtered: BlockDto[] = [];
  searchTerm = '';
  loading = false;
  error?: string;

  selectedHash: string | null = null;
  diff: DiffPiece[] = [];

  constructor(private voteService: VoteService,
              private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Hääle kontroll - IVXV proto')
    this.loadRecent();

    this.voteService.stream().subscribe({
      next: vote => {
        this.latest.unshift(vote);
        this.applyCurrentFilter();
      },
      error: () => {
      this.error = 'Ei saanud hääli laadida.';
    }
   });
  }

  private loadRecent(): void {
    this.loading = true;
    this.error = undefined;

    this.voteService.getRecent().subscribe({
      next: data => {
        this.latest   = data;
        this.applyCurrentFilter();
      },
      error: () => {
        this.error = 'Avalikku tahvlit ei õnnestunud laadida.';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  onSearch(term: string): void {
    this.searchTerm = term.trim();
    this.selectedHash = null;
    this.diff = [];

    if (!this.searchTerm) {
      this.loadRecent();
    } else {
      this.voteService.search(this.searchTerm).subscribe({
        next: found => this.filtered = found,
        error: () => this.error ='Otsing ebaõnnestus.'
      });
    }
  }

  private applyCurrentFilter() {
    if (!this.searchTerm) {
      this.filtered = [...this.latest];
    } else {
      this.filtered = this.latest.filter(b =>
        b.ciphertext.includes(this.searchTerm)
      );
    }
  }

  select(vote: BlockDto) {
    this.selectedHash = vote.ciphertext;
    this.computeDiff();
  }

  private computeDiff() {
    const a = this.searchTerm;
    const b = this.selectedHash || '';
    const max = Math.max(a.length, b.length);
    this.diff = [];
    for (let i = 0; i < max; i++) {
      const inputChar = a.charAt(i) || '';
      const voteChar = b.charAt(i) || '';
      this.diff.push({ inputChar, voteChar, match: inputChar === voteChar });
    }
  }
}
