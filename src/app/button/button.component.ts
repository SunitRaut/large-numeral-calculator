import { Component,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl:'./button.component.html',
  styleUrl: './button.component.css'
})

export class ButtonComponent {
  @Input() value !: string;
  @Output() sendInput = new EventEmitter<string>();

  onClick(value:string){
    this.sendInput.emit(value); 
  }
}
