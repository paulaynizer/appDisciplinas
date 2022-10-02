import { AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms";
import {Directive, Input} from '@angular/core';

@Directive({
  selector:'[lessDate]',
  providers:[{provide: NG_VALIDATORS,useExisting:'dateValidator',multi:true}]
})

class dateValidator implements Validator{

  @Input('lessDate') beless: any;
  validate(control: AbstractControl):{[key: string]: any | null}{
    console.log(this.beless);
    console.log(control.value);

    const sDate = new Date(this.beless);
    const eDate = new Date(control.value);

    console.log((sDate > eDate)?{'StartDateIsMore':true}:null);

    return(sDate > eDate)?{'StartDateIsMore':true}:null;
  }
}
