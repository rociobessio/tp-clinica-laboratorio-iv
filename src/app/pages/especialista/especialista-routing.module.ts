import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspecialistaComponent } from './especialista.component';

const routes: Routes = [
  {
    path: '',
    component: EspecialistaComponent,
    children: [
      {
        path: '',
        loadChildren : () =>
          import('./home/home.module')
        .then(h => h.HomeModule)
      },
      {
        path: 'mi-perfil',
        loadChildren: () =>
          import('./mi-perfil/mi-perfil.module')
        .then(p => p.MiPerfilModule)
      },
      {
        path: 'mis-horarios',
        loadChildren: () =>
          import('./mis-horarios/mis-horarios.module')
        .then(mh => mh.MisHorariosModule)
      },
      {
        path: 'mis-turnos',
        loadChildren: () =>
          import('./mis-turnos/mis-turnos.module')
        .then(mt => mt.MisTurnosModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspecialistaRoutingModule { }
