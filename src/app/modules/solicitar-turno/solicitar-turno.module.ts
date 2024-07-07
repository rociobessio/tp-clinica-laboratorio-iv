import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitarTurnoRoutingModule } from './solicitar-turno-routing.module';
import { SolicitarTurnoComponent } from '../../components/solicitar-turno/solicitar-turno.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HoraFormatoModule } from '../pipes/hora-formato/hora-formato.module';
import { DoctorModule } from '../pipes/doctor/doctor.module';


@NgModule({
  declarations: [
    SolicitarTurnoComponent
  ],
  imports: [
    CommonModule,
    SolicitarTurnoRoutingModule,
    MatProgressSpinnerModule,
    HoraFormatoModule,
    DoctorModule
  ],
  exports: [SolicitarTurnoComponent]
})
export class SolicitarTurnoModule { }
