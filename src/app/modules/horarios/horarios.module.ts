import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HorariosRoutingModule } from './horarios-routing.module';
import { FormsModule } from '@angular/forms';
import { JornadaComponent } from '../../components/jornada/jornada.component';


@NgModule({
  declarations: [
    JornadaComponent
  ],
  imports: [
    CommonModule,
    HorariosRoutingModule,
    FormsModule
  ],
  exports: [JornadaComponent]
})
export class HorariosModule { }
