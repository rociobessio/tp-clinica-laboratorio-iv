import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoraFormatoPipe } from '../../../pipes/hora-formato.pipe';



@NgModule({
  declarations: [
    HoraFormatoPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [HoraFormatoPipe]
})
export class HoraFormatoModule { }
