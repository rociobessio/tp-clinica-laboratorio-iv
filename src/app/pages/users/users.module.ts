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


@NgModule({
  declarations: [
    UsersComponent,
    SidebarComponent,
    EspecialistasComponent,
    PacientesComponent,
    AdministradoresComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    RegisterModule,
    MatProgressSpinnerModule
  ]
})
export class UsersModule { }
