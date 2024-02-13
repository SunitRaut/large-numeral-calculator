import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-number-units',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl:'./number-units.component.html',
  styleUrl: './number-units.component.css'
})
export class NumberUnitsComponent {

}
