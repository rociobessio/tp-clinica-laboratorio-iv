import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteComponent } from './paciente.component';

const routes: Routes = [
  {
    path: '',
    component: PacienteComponent,
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
