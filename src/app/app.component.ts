import { Component, asNativeElements } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScreenComponent } from './screen/screen.component';
import { NumberpadComponent } from './numberpad/numberpad.component';
import { OperatorsComponent } from './operators/operators.component';
import { NumberUnitsComponent } from './number-units/number-units.component';
import { ButtonComponent } from './button/button.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ScreenComponent,ButtonComponent,
            NumberpadComponent,OperatorsComponent,NumberUnitsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
}) 
export class AppComponent {
  title = 'large-number-verbal-calculator';
  line1 = '0';
  line2 = '';
  numbers = [0];
  ops = [''];
  units :string[];
  c_units = '';
  multiplier = 10;
  precision = 0;
  inactive = false;
  prev = '';
  LkCrDisplay = 'inline';
  MiBiTrDisplay = 'inline';
  
  constructor()
  {
    this.units = [''];
  }

  handleInput(value:any)
  {
    if(this.inactive == true) return;
    setTimeout(()=>{this.inactive=false},50);
    this.inactive = true;
    let nb_count = this.numbers.length - 1;
    var add_line1 = '';
    
    if((value>='0')&&(value<='9')) {

      var number = this.numbers[nb_count];
      if(this.multiplier >= 1){
        number = parseInt(value) + number*this.multiplier;
      }
      else{
        var dec_add = parseFloat((parseInt(value)*this.multiplier).toPrecision(1));
        number = parseFloat((dec_add + number).toFixed(this.precision));
        this.multiplier /= 10;
        this.precision++;
      }
      this.numbers[nb_count] = number;
      this.prev='numbers';

    }else if((value=='.')){

      if(this.multiplier < 1) return;
       this.multiplier = 0.1;
       this.precision = 1;
       add_line1 = '.';
       this.numbers[nb_count] = parseFloat((this.numbers[nb_count]).toFixed(1));

    }else if((value=='+')||(value=='-')||(value=='x')||(value=='÷')){
      this.precision = 0;
      this.multiplier = 10;
      this.numbers.push(0);
      this.ops.push(value);
      this.units.push('');
      add_line1 = value;
      this.prev = 'ops';
    }else if(value=='='){
      this.calculate_answer();
      this.prev = 'numbers';
      return;
    }else if((value=='Lk')||(value=='Cr')||(value=='Mi')||(value=='Bi')||(value=='Tr')){
      if(this.numbers[nb_count]==0) return;
      if((this.c_units=='LkCr')&&!((value=='Lk')||(value=='Cr'))) return;
      if((this.c_units=='MiBiTr')&&!((value=='Mi')||(value=='Bi')||(value=='Tr'))) return;
      this.units[nb_count] += value;
      if((value=='Lk')||(value=='Cr')) {
        this.c_units = 'LkCr';
        this.LkCrDisplay = 'inline';
        this.MiBiTrDisplay = 'none';
      }
      else {
        this.c_units = 'MiBiTr';
        this.LkCrDisplay = 'none';
        this.MiBiTrDisplay = 'inline';
      }
      this.ops.push('_');this.numbers.push(0);this.units.push(''); 
      this.prev = 'numbers';
    }else if(value=='C'){
      this.numbers = [0];
      this.ops = [''];
      this.units=[''];
      nb_count = this.numbers.length - 1;
      this.line2 = '';
    }else if(value=='CE')
    {
      if(nb_count==0) {
        this.numbers = [0];
        this.ops = [''];
        this.units=[''];
      }else{
        if(this.numbers[nb_count]!=0){
          this.numbers[nb_count]=0;
          this.units[nb_count]='';
          add_line1 = this.ops[this.ops.length-1];
        }
        else
        {
          this.numbers.pop();
          this.ops.pop();
          this.units.pop();  
        }
        nb_count--;
        
      }
      this.line2 = '';
    }else if(value=='X')
    {
      
    }

    console.log(this.numbers);
    console.log(this.ops);
    //this.line1 = String(this.numbers);
    var text = '';
    for(let i = 0; i<=nb_count;i++)
    { 
      if(this.ops[i]!='_')
        text += this.ops[i]; 
      if((this.ops[i]=='_')&&(this.numbers[i]==0)) continue;
        text += String(this.numbers[i]);
      text += String(this.units[i]);
    }
    this.line1 = text + add_line1;
  }

  calculate_answer()
  {
    this.line2 = '';
    var nb_count = this.numbers.length - 1;
    var ans = 0;
    for(let i = 0; i<=nb_count;i++)
    {
      var num = this.numbers[i];
      switch(this.units[i]){
        case ('Lk'): num = (100000)*num; break;
        case ('Cr'): num = (10000000)*num; break;
        case ('Mi'): num = (1000000)*num; break;
        case ('Bi'): num = (1000000000)*num; break;
        case ('Tr'): num = (1000000000000)*num; break;
      }

      switch(this.ops[i]){
        case (''):  ans = num; break;
        case ('+'): ans += num; break;
        case ('-'): ans -= num; break;
        case ('x'): ans *= num; break;
        case ('÷'): ans /= num; break;
        case ('_'): ans += num; break;
      }
    }
    // answer calculated
    // refresh line1 & line2 below
    this.numbers = [];
    this.ops = [''];
    this.units=[];

    if(this.c_units=='LkCr'){
      var lk = Math.floor(ans/100000);
      var cr = Math.floor(lk/100);
      lk = lk - 100*cr;
      var rest = ans - cr*10000000 - lk*100000;
      if(cr>0) {this.line2 += cr + 'Cr';this.numbers.push(cr);this.units.push('Cr');this.ops.push('_');}
      if(lk>0) {this.line2 += lk + 'Lk';this.numbers.push(lk);this.units.push('Lk');this.ops.push('_');}
      if(rest>0) {this.line2 += rest;this.numbers.push(rest);this.units.push('');}
    }
    else if(this.c_units=='MiBiTr'){
      var mi = Math.floor(ans/1000000);
      var bi = Math.floor(mi/1000);
      var tr = Math.floor(bi/1000);
      mi = mi - bi*1000;
      bi = bi - tr*1000;
      var rest = ans - mi*1000000 - bi*1000000000 - tr*1000000000000;
      if(tr>0) {this.line2 += tr + 'Tr';this.numbers.push(tr);this.units.push('Tr');this.ops.push('_');}
      if(bi>0) {this.line2 += bi + 'Bi';this.numbers.push(bi);this.units.push('Bi');this.ops.push('_');}
      if(mi>0) {this.line2 += mi + 'Mi';this.numbers.push(mi);this.units.push('Mi');this.ops.push('_');}
      if(rest>0) {this.line2 += rest;this.numbers.push(rest);this.units.push('');}
    }
    else
    {
      this.line2 = String(ans);
      this.numbers.push(ans);
      this.units.push('');
    }

    /*this.numbers = [ans];
    this.ops=[""];
    this.units = [""];
    */
    this.line1 = "0";
    
  }


}
