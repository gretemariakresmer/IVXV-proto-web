import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { steps } from '../app.routes';
import { NgForOf, NgIf } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-step-progress',
  templateUrl: './step-progress.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
  ],
  styleUrls: ['./step-progress.component.scss']
})
export class StepProgressComponent implements OnInit {
  steps = steps;
  currentStepIndex = -1;
  show = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(evt => evt instanceof NavigationEnd))
      .subscribe((evt: NavigationEnd) => {
        const url = evt.urlAfterRedirects.split('?')[0].split('#')[0] || '/';
        const idx = this.steps.findIndex(s => {
          const p = s.path ? `/${s.path}` : '/';
          return p === url;
        });
        this.currentStepIndex = idx;
        this.show = idx !== -1;
      });
  }
}
