import { Component } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { slideInAnimation, slider } from './animations/animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [slider,slideInAnimation]
})
export class AppComponent {
  title = 'tp-clinica-labo';

  prepareRouteAnimation(outlet:RouterOutlet){
    // console.log('outlet animation: ', outlet);
    
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
