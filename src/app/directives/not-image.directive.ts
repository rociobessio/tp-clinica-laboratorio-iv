import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appNotImage]',
})
export class NotImageDirective implements OnInit {

  private defaultImageSrc: string = 'assets/def-icon.png';

  constructor(private elementImg: ElementRef) { }

  @HostListener('error')
  onError(): void {
    console.log('Error loading image, setting default.');
    this.elementImg.nativeElement.src = this.defaultImageSrc;
  }

  @HostListener('load')
  onLoad(): void {
    if (this.elementImg.nativeElement.naturalWidth === 0 || this.elementImg.nativeElement.naturalHeight === 0) {
      console.log('Image loaded but with 0 dimensions, setting default.');
      this.elementImg.nativeElement.src = this.defaultImageSrc;
    }
  }

  ngOnInit(): void {
    if (!this.elementImg.nativeElement.src || this.elementImg.nativeElement.src === '') {
      console.log('Image src is empty, setting default.');
      this.elementImg.nativeElement.src = this.defaultImageSrc;
    }
  }
}
