import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiPerfilRoutingModule } from './mi-perfil-routing.module';
import { MiPerfilComponent } from './mi-perfil.component';
import { MiHistorialClinicoComponent } from '../../../components/tables/mi-historial-clinico/mi-historial-clinico.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DoctorModule } from '../../../modules/pipes/doctor/doctor.module';
import { FormatoDniModule } from '../../../modules/pipes/formato-dni/formato-dni.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MiPerfilComponent,
    MiHistorialClinicoComponent
  ],
  imports: [
    CommonModule,
    MiPerfilRoutingModule,
    MatProgressSpinner,
    DoctorModule,
    FormatoDniModule,
    FormsModule
  ]
})
export class MiPerfilModule { }
