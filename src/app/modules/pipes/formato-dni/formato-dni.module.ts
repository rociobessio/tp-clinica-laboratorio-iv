import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatoDniPipe } from '../../../pipes/formato-dni.pipe';



@NgModule({
  declarations: [
    FormatoDniPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [FormatoDniPipe]
})
export class FormatoDniModule { }
