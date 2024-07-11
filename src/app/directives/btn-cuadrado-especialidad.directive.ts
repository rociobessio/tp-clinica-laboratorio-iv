import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBtnCuadradoEspecialidad]'
})
export class BtnCuadradoEspecialidadDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.applyStyles();
  }

  private applyStyles() {
    this.renderer.setStyle(this.el.nativeElement, 'width', '150px');
    this.renderer.setStyle(this.el.nativeElement, 'height', '150px');
    this.renderer.setStyle(this.el.nativeElement, 'border-radius', '15px');
    this.renderer.setStyle(this.el.nativeElement, 'overflow', 'hidden');
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    this.renderer.setStyle(this.el.nativeElement, 'display', 'flex');
    this.renderer.setStyle(this.el.nativeElement, 'align-items', 'center');
    this.renderer.setStyle(this.el.nativeElement, 'justify-content', 'center');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 0.3s ease-in-out');
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
    this.renderer.setStyle(this.el.nativeElement, 'background-color', 'darkslategrey');
  }
}
