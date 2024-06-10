import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterPacienteRoutingModule } from './register-paciente-routing.module';
import { TablaObraSocialComponent } from '../../../../components/tables/tabla-obra-social/tabla-obra-social.component';
import { RegisterPacienteComponent } from './register-paciente.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormPacienteComponent } from '../../../../components/forms/form-paciente/form-paciente.component';
import { RegisterModule } from '../../../../modules/register/register.module';


@NgModule({
  declarations: [
    RegisterPacienteComponent
  ],
  imports: [
    CommonModule,
    RegisterPacienteRoutingModule,
    ReactiveFormsModule,
    RegisterModule
  ]
})
export class RegisterPacienteModule { }
