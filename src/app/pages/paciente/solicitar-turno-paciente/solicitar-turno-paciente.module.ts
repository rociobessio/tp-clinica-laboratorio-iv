import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitarTurnoPacienteRoutingModule } from './solicitar-turno-paciente-routing.module';
import { SolicitarTurnoPacienteComponent } from './solicitar-turno-paciente.component';
import { SolicitarTurnoModule } from '../../../modules/solicitar-turno/solicitar-turno.module';


@NgModule({
  declarations: [
    SolicitarTurnoPacienteComponent
  ],
  imports: [
    CommonModule,
    SolicitarTurnoPacienteRoutingModule,
    SolicitarTurnoModule
  ]
})
export class SolicitarTurnoPacienteModule { }
