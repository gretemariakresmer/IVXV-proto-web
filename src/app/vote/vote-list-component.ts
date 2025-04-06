import { Component, OnInit } from '@angular/core';
import {Vote} from './vote';
import {VoteService} from './vote.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-user-list',
  templateUrl: './vote.html',
  styleUrls: ['vote.scss'],
  imports: [CommonModule],
  standalone: true
})
export class VoteListComponent implements OnInit {

  votes: Vote[] = [];

  constructor(private voteService: VoteService) { }

  ngOnInit(): void {
    this.loadVotes();
    console.log(this.votes)
  }

  loadVotes() {
    this.voteService.getVotes().subscribe(data => this.votes = data);
  }
}
