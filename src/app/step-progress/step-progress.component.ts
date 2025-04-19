import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { steps } from '../app.routes';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-step-progress',
  templateUrl: './step-progress.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  styleUrls: ['./step-progress.component.scss']
})
export class StepProgressComponent implements OnInit {
  steps = steps;
  currentStepIndex = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
  }
}
