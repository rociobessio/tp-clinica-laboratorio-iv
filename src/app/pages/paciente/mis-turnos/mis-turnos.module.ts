import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisTurnosRoutingModule } from './mis-turnos-routing.module';
import { MisTurnosComponent } from './mis-turnos.component';
import { DoctorModule } from '../../../modules/pipes/doctor/doctor.module';
import { HoraFormatoModule } from "../../../modules/pipes/hora-formato/hora-formato.module";


@NgModule({
    declarations: [
        MisTurnosComponent
    ],
    imports: [
        CommonModule,
        MisTurnosRoutingModule,
        DoctorModule,
        HoraFormatoModule
    ]
})
export class MisTurnosModule { }
