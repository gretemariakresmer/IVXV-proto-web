import { Component } from '@angular/core';
import { Router }    from '@angular/router';
import { CommonModule } from '@angular/common';
import { ElectionInformationComponent } from './election/election-information.component';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [
    CommonModule,
    ElectionInformationComponent,
  ],
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent {
  userName: string = 'Peeter Hääletaja';
  userIdCode: string = '12345678901';

  constructor(private router: Router) {}
  onCancel()  { this.router.navigate(['']); }
  onContinue(){ this.router.navigate(['/choose']); }
}

