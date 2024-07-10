import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Paciente } from '../../interfaces/paciente.interface';

@Component({
  selector: 'app-fav-button',
  templateUrl: './fav-button.component.html',
  styleUrl: './fav-button.component.css'
})
export class FavButtonComponent {
///////////////////////////////////////// ATRIBUTOS /////////////////////////////////////////
  @Input() pacientes: Paciente[] = [];
  @Output() pacienteSeleccionado = new EventEmitter<Paciente>();
  isDropdownOpen = false;

///////////////////////////////////////// METODOS /////////////////////////////////////////
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectPaciente(paciente: Paciente) {
    this.pacienteSeleccionado.emit(paciente);
    this.toggleDropdown();
  }

}
