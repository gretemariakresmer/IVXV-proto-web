import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PartyGroup } from '../model/party-group';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';
import { Person } from '../model/person';
import { SelectionInformation } from '../model/selection-information';
import { PartyService } from '../../../service/party.service';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-party-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIcon,
    MatIconButton]
  ,
  templateUrl: './party-dropdown.component.html',
  styleUrls: ['./party-dropdown.component.scss'],
})
export class PartyDropdownComponent implements OnInit {
  @Output() selectionInformation = new EventEmitter<SelectionInformation>();

  allParties: Array<PartyGroup & { expanded: boolean }> = [];
  filteredParties: Array<PartyGroup & { expanded: boolean }> = [];
  searchTerm = '';
  errorMessage: string | null = null;
  loading: boolean = false;

  private searchSubject = new Subject<string>();
  private searchSub!: Subscription;

  constructor(private partyService: PartyService) {}

  ngOnInit() {
    this.loading = true;
    this.partyService.getPartiesWithCandidates()
      .subscribe({
        next: groups => {
          this.allParties = groups.map(g => ({...g, expanded: false}));
          this.filteredParties = this.allParties;
        }, error: err => {
          this.errorMessage = 'Andmete laadimine ebaõnnestus. Proovi uuesti.';
        }, complete: () => this.loading = false
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

  pick(person: Person, partyName: String) {
    this.selectionInformation.emit( { person: person, partyName: partyName });
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
      .filter(g => g.party.toLowerCase().includes(termin) || g.candidates.length > 0)as Array<PartyGroup & {  expanded: boolean }>;
  }

  cleanInput() {
    this.searchTerm = '';
    this.applyFilter('');
  }
}
