import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-numberpad',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './numberpad.component.html',
  styleUrl: './numberpad.component.css'
})
export class NumberpadComponent {

}
