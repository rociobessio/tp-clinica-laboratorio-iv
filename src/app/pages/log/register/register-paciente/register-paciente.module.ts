import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterPacienteRoutingModule } from './register-paciente-routing.module';
import { TablaObraSocialComponent } from '../../../../components/tables/tabla-obra-social/tabla-obra-social.component';
import { RegisterPacienteComponent } from './register-paciente.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    TablaObraSocialComponent,
    RegisterPacienteComponent
  ],
  imports: [
    CommonModule,
    RegisterPacienteRoutingModule,
    ReactiveFormsModule
  ]
})
export class RegisterPacienteModule { }
