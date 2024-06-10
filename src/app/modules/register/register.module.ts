import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { FormPacienteComponent } from '../../components/forms/form-paciente/form-paciente.component';
import { TablaObraSocialComponent } from '../../components/tables/tabla-obra-social/tabla-obra-social.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FormPacienteComponent,
    TablaObraSocialComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule
  ],
  exports: [FormPacienteComponent] 
})
export class RegisterModule { }
