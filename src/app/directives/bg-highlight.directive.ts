import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBgHighlight]'
})
export class BgHighlightDirective {

  constructor(private elRef: ElementRef, private renderer: Renderer2 ) { }
  @HostListener('mouseenter') mouseover(eventData: Event){
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'yellow');
    this.renderer.setStyle(this.elRef.nativeElement, 'color', 'brown');
  }
  @HostListener('mouseleave') mouseleave(eventData: Event){
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
    this.renderer.setStyle(this.elRef.nativeElement, 'color', 'black');
  }
}
