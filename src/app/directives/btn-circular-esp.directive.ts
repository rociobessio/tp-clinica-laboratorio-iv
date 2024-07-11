import { AfterViewInit, Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appBtnCircularEsp]'
})
export class BtnCircularEspDirective implements AfterViewInit{
  constructor(private e: ElementRef) { }

  ngAfterViewInit(): void {
    const el = this.e.nativeElement;
    el.classList.add('circular-div');
    el.style.width = '150px';
    el.style.height = '150px';
    el.style.borderRadius = '50%';
    el.style.overflow = 'hidden';
    el.style.position = 'relative';
    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';
    el.style.transition = 'all 0.3s ease-in-out';
    el.style.backgroundColor = 'darkslategrey';
    
  }

  @HostListener('mouseenter') onMouseEnter() {
    const el = this.e.nativeElement;
    el.style.transform = 'scale(1.1)';
    el.style.border = '10px solid #0b1d60';
  }

  @HostListener('mouseleave') onMouseLeave() {
    const el = this.e.nativeElement;
    el.style.transform = 'scale(1.0)';
    el.style.border = 'none';
  }
}
