import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPacienteComponent } from '../../components/forms/form-paciente/form-paciente.component';

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
