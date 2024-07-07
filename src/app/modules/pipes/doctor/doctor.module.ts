import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorPipe } from '../../../pipes/doctor.pipe';



@NgModule({
  declarations: [
    DoctorPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [DoctorPipe]
})
export class DoctorModule { }
