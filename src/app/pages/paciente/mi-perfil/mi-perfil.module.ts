import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiPerfilRoutingModule } from './mi-perfil-routing.module';
import { MiPerfilComponent } from './mi-perfil.component';
import { MiHistorialClinicoComponent } from '../../../components/tables/mi-historial-clinico/mi-historial-clinico.component';


@NgModule({
  declarations: [
    MiPerfilComponent,
    MiHistorialClinicoComponent
  ],
  imports: [
    CommonModule,
    MiPerfilRoutingModule
  ]
})
export class MiPerfilModule { }
