import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule }       from '@angular/forms';
import { NgForOf, NgIf }     from '@angular/common';
import { BlockDto } from './model/block-dto';
import { SearchComponent } from './search/search.component';
import { Title } from '@angular/platform-browser';
import { VoteService } from '../service/vote.service';

@Component({
  selector: 'app-check-vote',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgForOf,
    NgIf,
    SearchComponent],
  templateUrl: './check-vote.component.html',
  styleUrls: ['./check-vote.component.scss']
})
export class CheckVoteComponent implements OnInit {
  chain: BlockDto[] = [];
  latest: BlockDto[] = [];
  filtered: BlockDto[] = [];
  searchTerm = '';
  loading = false;
  error?: string;

  constructor(private voteService: VoteService,
              private title: Title) {}

  ngOnInit(): void {
    this.loadChain();
    this.title.setTitle('Hääle kontroll - IVXV proto')
  }

  private loadChain(): void {
    this.loading = true;
    this.error = undefined;
    this.voteService.getVotes().subscribe({
      next: data => {
        this.chain = data;
        this.latest   = data.slice(-10).reverse();
        this.filtered = this.latest;
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
    if (!this.searchTerm) {
      this.filtered = this.latest;
    } else {
      this.filtered = this.chain.filter(b =>
        b.ciphertext.includes(this.searchTerm)
      );
    }
  }
}
