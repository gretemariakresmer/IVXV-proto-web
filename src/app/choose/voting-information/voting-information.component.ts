import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-voting-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'voting-information.component.html',
  styleUrls: ['voting-information.component.scss']
})
export class ElectionInfoComponent {
  @Input() district!: string;
  @Input() constituency!: string;
}
