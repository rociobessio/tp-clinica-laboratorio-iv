import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisPacientesComponent } from './mis-pacientes.component';

const routes: Routes = [
  {
    path: '',
    component: MisPacientesComponent,
    data: { animation: 'isRight' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MisPacientesRoutingModule { }
