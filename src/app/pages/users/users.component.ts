import { Component } from '@angular/core';
import { Admin } from '../../interfaces/admin.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  public select: string = 'usuarios';
  public admin!: Admin;

  /**
   * Para navegar por
   * las rutas dependiendo
   * de la opcion que selecione
   * en el navbar.
   * @param $event 
   */
  getSelect($event: string) {
    this.select = $event;
    console.log(this.select);
  }

}
