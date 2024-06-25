import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HorariosRoutingModule } from './horarios-routing.module';
import { FormsModule } from '@angular/forms';
import { JornadaComponent } from '../../components/jornada/jornada.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    JornadaComponent
  ],
  imports: [
    CommonModule,
    HorariosRoutingModule,
    FormsModule,
    MatProgressSpinner
  ],
  exports: [JornadaComponent]
})
export class HorariosModule { }
