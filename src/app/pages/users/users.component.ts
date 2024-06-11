import { Component, OnInit } from '@angular/core';
import { Admin } from '../../interfaces/admin.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  public select: string = 'usuarios';
  public admin!: Admin;

  constructor(private auth : AuthService){}

  /**
   * En el OnInit cargo
   * los datos del administrador.
   */
  ngOnInit(): void {
    console.log('En el onInit');
    
    this.auth.getUserLogged()
      .subscribe((usuario) =>{
        console.log('Usuario: ',usuario);
        this.auth.esAdmin(usuario?.email!)
          .subscribe((admin)=>{
            if(admin) this.admin = admin as Admin;
            console.log('Admin: ',admin);
          })
      });
  }

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
