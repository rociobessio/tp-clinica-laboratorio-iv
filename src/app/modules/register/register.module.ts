import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { FormPacienteComponent } from '../../components/forms/form-paciente/form-paciente.component';
import { TablaObraSocialComponent } from '../../components/tables/tabla-obra-social/tabla-obra-social.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormEspecialistaComponent } from '../../components/forms/form-especialista/form-especialista.component';
import { EspecialidadComponent } from '../../components/tables/especialidad/especialidad.component';
import { NgxSpinnerModule } from 'ngx-spinner';


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
    NgxSpinnerModule
  ],
  exports: [FormPacienteComponent,FormEspecialistaComponent] 
})
export class RegisterModule { }
