import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterEspecialistaRoutingModule } from './register-especialista-routing.module';
import { RegisterEspecialistaComponent } from './register-especialista.component';
import { EspecialidadComponent } from '../../../../components/tables/especialidad/especialidad.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RegisterModule } from '../../../../modules/register/register.module';

@NgModule({
  declarations: [
    RegisterEspecialistaComponent,
  ],
  imports: [
    CommonModule,
    RegisterEspecialistaRoutingModule,
    ReactiveFormsModule,
    RegisterModule
  ]
})
export class RegisterEspecialistaModule { }
