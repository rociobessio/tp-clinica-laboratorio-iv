import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisPacientesComponent } from './mis-pacientes.component';

const routes: Routes = [
  {
    path: '',
    component: MisPacientesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MisPacientesRoutingModule { }
