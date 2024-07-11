import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisPacientesRoutingModule } from './mis-pacientes-routing.module';
import { MisPacientesComponent } from './mis-pacientes.component';
import { FabButtonModule } from '../../../modules/fab-button/fab-button.module';
import { HistorialClinicoFilterModule } from '../../../modules/historial-clinico-filter/historial-clinico-filter.module';


@NgModule({
  declarations: [
    MisPacientesComponent
  ],
  imports: [
    CommonModule,
    MisPacientesRoutingModule,
    FabButtonModule,
    HistorialClinicoFilterModule
  ]
})
export class MisPacientesModule { }
