import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-historial-clinico-filter',
  templateUrl: './historial-clinico-filter.component.html',
  styleUrl: './historial-clinico-filter.component.css'
})
export class HistorialClinicoFilterComponent {
  filtroNombre: string = '';

  @Output() filtroCambiado: EventEmitter<string> = new EventEmitter<string>();

  onFiltroCambiado(): void {
    this.filtroCambiado.emit(this.filtroNombre);
  }
}
