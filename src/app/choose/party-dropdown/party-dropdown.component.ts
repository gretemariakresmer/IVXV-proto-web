import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PartyGroup } from '../model/party-group';
import { PartyService } from '../../service/party.service';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';
import {Person} from '../model/person';

@Component({
  selector: 'app-party-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './party-dropdown.component.html',
  styleUrls: ['./party-dropdown.component.scss'],
})
export class PartyDropdownComponent implements OnInit {
  @Output() selectedPerson = new EventEmitter<Person>();

  allParties: Array<PartyGroup & { expanded: boolean }> = [];
  filteredParties: Array<PartyGroup & { expanded: boolean }> = [];
  searchTerm = '';

  private searchSubject = new Subject<string>();
  private searchSub!: Subscription;

  constructor(private partyService: PartyService) {}


  ngOnInit() {
    this.partyService.getPartiesWithCandidates()
      .subscribe(groups => {
        this.allParties = groups.map(g => ({ ...g, expanded: false }));
        this.filteredParties = this.allParties;
      });

    this.searchSub = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      const t = term.trim().toLowerCase();

      if (t.length >= 3) {
        this.applyFilter(t);
      } else {
        this.filteredParties = this.allParties;
      }
    });
  }

  ngOnDestroy() {
    this.searchSub.unsubscribe();
  }

  toggle(group: PartyGroup & { expanded: boolean }) {
    group.expanded = !group.expanded;
  }

  onSearch(term: string) {
    this.searchSubject.next(term);
  }

  pick(c: Person) {
    this.selectedPerson.emit(c);
  }

  private applyFilter(termin: string) {
    this.filteredParties = this.allParties
      .map(g => {
        const nameMatches = g.party.toLowerCase().includes(termin);
        const candidates = g.candidates.filter(c =>
          (`${c.firstName} ${c.lastName}`).toLowerCase().includes(termin)
        );
        return {
          ...g,
          candidates,
          expanded: nameMatches || candidates.length > 0
        };
      })
      .filter(g => g.party.toLowerCase().includes(termin) || g.candidates.length > 0);
  }
}
