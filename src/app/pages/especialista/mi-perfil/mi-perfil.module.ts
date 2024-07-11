import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiPerfilRoutingModule } from './mi-perfil-routing.module';
import { MiPerfilComponent } from './mi-perfil.component';
import { HorariosModule } from '../../../modules/horarios/horarios.module';
import { FormatoDniModule } from '../../../modules/pipes/formato-dni/formato-dni.module';
import { DoctorModule } from '../../../modules/pipes/doctor/doctor.module';

@NgModule({
  declarations: [
    MiPerfilComponent
  ],
  imports: [
    CommonModule,
    MiPerfilRoutingModule,
    HorariosModule,
    FormatoDniModule,
    DoctorModule
  ]
})
export class MiPerfilModule { }
