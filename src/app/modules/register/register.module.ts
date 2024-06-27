import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { FormPacienteComponent } from '../../components/forms/form-paciente/form-paciente.component';
import { TablaObraSocialComponent } from '../../components/tables/tabla-obra-social/tabla-obra-social.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormEspecialistaComponent } from '../../components/forms/form-especialista/form-especialista.component';
import { EspecialidadComponent } from '../../components/tables/especialidad/especialidad.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaFormsModule, RecaptchaModule, RecaptchaV3Module } from "ng-recaptcha-2";
import { NgxCaptchaModule } from 'ngx-captcha';

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
    MatProgressSpinnerModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    NgxCaptchaModule
  ],
  providers: [{ provide: RECAPTCHA_V3_SITE_KEY, useValue: "6LcNGQIqAAAAAMPgoAeH7PKi6PLnAkWegpmhAcKq" }],
  exports: [FormPacienteComponent,FormEspecialistaComponent] 
})
export class RegisterModule { }
