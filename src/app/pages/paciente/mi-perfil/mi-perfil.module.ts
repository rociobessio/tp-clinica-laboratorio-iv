import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiPerfilRoutingModule } from './mi-perfil-routing.module';
import { MiPerfilComponent } from './mi-perfil.component';
import { MiHistorialClinicoComponent } from '../../../components/tables/mi-historial-clinico/mi-historial-clinico.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DoctorModule } from '../../../modules/pipes/doctor/doctor.module';


@NgModule({
  declarations: [
    MiPerfilComponent,
    MiHistorialClinicoComponent
  ],
  imports: [
    CommonModule,
    MiPerfilRoutingModule,
    MatProgressSpinner,
    DoctorModule
  ]
})
export class MiPerfilModule { }
