import { Component, Input } from '@angular/core';
import { CommonModule }      from '@angular/common';

@Component({
  selector: 'app-election-information',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './election-information.component.html',
  styleUrls: ['./election-information.component.scss']
})
export class ElectionInformationComponent {
  @Input() electionTitle: string = 'Tere tulemast!';
  @Input() description: string = 'Olete e‑hääletamas 2025. aasta proovihääletustel.';
}
