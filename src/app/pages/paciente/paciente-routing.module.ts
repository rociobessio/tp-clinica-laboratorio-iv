import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteComponent } from './paciente.component';

const routes: Routes = [
  {
    path: '',
    component: PacienteComponent,
    data: { animation: 'p <=> p' },
    children: [
      {
        path: '',
        loadChildren: () => import ('./home/home.module')
        .then(m => m.HomeModule)
      },
      {
        path: 'mi-perfil',
        loadChildren : () => import ('./mi-perfil/mi-perfil.module')
        .then(p => p.MiPerfilModule)
      },
      {
        path: 'solicitar-turno',
        loadChildren: () =>
          import('./solicitar-turno-paciente/solicitar-turno-paciente.module')
        .then(s => s.SolicitarTurnoPacienteModule)
      },
      {
        path: 'mis-turnos',
        loadChildren : () =>
          import('./mis-turnos/mis-turnos.module')
        .then(t => t.MisTurnosModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
