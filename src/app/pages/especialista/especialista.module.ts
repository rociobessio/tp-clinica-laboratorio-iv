import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspecialistaRoutingModule } from './especialista-routing.module';
import { EspecialistaComponent } from './especialista.component';
import { NavbarModule } from '../../modules/navbar/navbar.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EspecialistaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    EspecialistaRoutingModule,
    NavbarModule
  ]
})
export class EspecialistaModule { }
