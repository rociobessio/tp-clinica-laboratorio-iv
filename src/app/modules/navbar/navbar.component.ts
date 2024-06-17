import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  @Input() public rol: string = '';//-->Para pasarle el rol,

  public activeRol!: string;

  constructor(private router : Router, private authService : AuthService) {}

  ngOnInit(): void {
    console.log('Navbar de: ', this.rol);
  }

  logOut() {
    this.authService.logOut();
    this.goTo('');
  }
  
  goTo(ruta: string) {
    this.router.navigateByUrl(ruta);
  }

  getRol(rol: string) {
    this.activeRol = rol;
  }
}
