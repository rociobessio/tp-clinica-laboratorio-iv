import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Output() salida = new EventEmitter<string>();

  constructor(private router : Router, private auth : AuthService){}

  /**
   * 
   * @param selector A donde quiera 
   * ir.
   */
  opcion(selector : string){this.salida.emit(selector)}

  logOut() : void{
    this.auth.logOut();
    this.router.navigate(['']);
  }
  
}
