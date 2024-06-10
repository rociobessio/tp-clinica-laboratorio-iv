import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterEspecialistaRoutingModule } from './register-especialista-routing.module';
import { RegisterEspecialistaComponent } from './register-especialista.component';
import { EspecialidadComponent } from '../../../../components/tables/especialidad/especialidad.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    RegisterEspecialistaComponent,
    EspecialidadComponent
  ],
  imports: [
    CommonModule,
    RegisterEspecialistaRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class RegisterEspecialistaModule { }
