import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from '@angular/router';
import { steps } from '../app.routes';
import { NgForOf } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-step-progress',
  templateUrl: './step-progress.component.html',
  standalone: true,
  imports: [
    NgForOf,
  ],
  styleUrls: ['./step-progress.component.scss']
})
export class StepProgressComponent implements OnInit {
  steps = steps;
  currentStepIndex = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(evt => evt instanceof NavigationEnd))
      .subscribe((evt: NavigationEnd) => {
        const url = evt.urlAfterRedirects.split('?')[0].split('#')[0];
        const idx = this.steps.findIndex(s => url === `/${s.path}`);
        this.currentStepIndex = idx >= 0 ? idx : 0;
      });
  }
}
