import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { EspecialistasComponent } from './especialistas/especialistas.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { AdministradoresComponent } from './administradores/administradores.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterModule } from '../../modules/register/register.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SolicitarTurnoAdminComponent } from './solicitar-turno-admin/solicitar-turno-admin.component';
import { SolicitarTurnoModule } from '../../modules/solicitar-turno/solicitar-turno.module';


@NgModule({
  declarations: [
    UsersComponent,
    SidebarComponent,
    EspecialistasComponent,
    PacientesComponent,
    AdministradoresComponent,
    SolicitarTurnoAdminComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    RegisterModule,
    MatProgressSpinnerModule,
    SolicitarTurnoModule
  ]
})
export class UsersModule { }
