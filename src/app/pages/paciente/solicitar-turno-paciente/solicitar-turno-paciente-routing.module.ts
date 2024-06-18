import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitarTurnoPacienteComponent } from './solicitar-turno-paciente.component';

const routes: Routes = [
  {
    path : '',
    component: SolicitarTurnoPacienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitarTurnoPacienteRoutingModule { }
