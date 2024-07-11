import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialClinicoFilterComponent } from '../../components/historial-clinico-filter/historial-clinico-filter.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HistorialClinicoFilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [HistorialClinicoFilterComponent]
})
export class HistorialClinicoFilterModule { }
