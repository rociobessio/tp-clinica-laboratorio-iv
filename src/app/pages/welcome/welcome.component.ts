import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

  constructor(private router : Router) {}
  
  ngOnInit(): void {
    console.log('Dentro del Welcome');
  }

  onIngresar(){
    this.router.navigateByUrl('/login');
  }
}
