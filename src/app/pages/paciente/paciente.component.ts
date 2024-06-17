import { Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css'
})
export class PacienteComponent {

  constructor(private contexts : ChildrenOutletContexts,private auth : AuthService) {}

  logOut(){
    this.auth.logOut();
  }
}
