import { Component,Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-screen',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl:'./screen.component.html',
  styleUrl: './screen.component.css'
})
export class ScreenComponent {
  @Input() line1!:string;
  @Input() line2!:string;

}
