import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule }    from '@angular/common';
import { FormsModule }     from '@angular/forms';
import { MatIconModule }   from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-search-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @Input() placeholder = 'Otsi…';
  @Output() search = new EventEmitter<string>();

  value = '';

  triggerSearch() {
    this.search.emit(this.value.trim())
  }

  async paste() {
    const text = await navigator.clipboard.readText().catch(() => '');
    this.value = text.trim();
    this.triggerSearch();
  }
}
