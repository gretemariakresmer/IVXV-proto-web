import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StepProgressComponent } from './step-progress/step-progress.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    StepProgressComponent
  ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

}
