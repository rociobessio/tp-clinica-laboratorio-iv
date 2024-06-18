import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitarTurnoRoutingModule } from './solicitar-turno-routing.module';
import { SolicitarTurnoComponent } from '../../components/solicitar-turno/solicitar-turno.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    SolicitarTurnoComponent
  ],
  imports: [
    CommonModule,
    SolicitarTurnoRoutingModule,
    MatProgressSpinnerModule
  ],
  exports: [SolicitarTurnoComponent]
})
export class SolicitarTurnoModule { }
