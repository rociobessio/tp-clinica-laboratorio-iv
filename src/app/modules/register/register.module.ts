import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { FormPacienteComponent } from '../../components/forms/form-paciente/form-paciente.component';
import { TablaObraSocialComponent } from '../../components/tables/tabla-obra-social/tabla-obra-social.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormEspecialistaComponent } from '../../components/forms/form-especialista/form-especialista.component';
import { EspecialidadComponent } from '../../components/tables/especialidad/especialidad.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    FormPacienteComponent,
    TablaObraSocialComponent,
    FormEspecialistaComponent,
    EspecialidadComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  exports: [FormPacienteComponent,FormEspecialistaComponent] 
})
export class RegisterModule { }
