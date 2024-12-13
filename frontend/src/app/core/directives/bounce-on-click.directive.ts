import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBounceOnClick]',
  standalone: true,
})
export class BounceOnClickDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click')
  onClick() {
    const element = this.el.nativeElement;

    this.renderer.addClass(element, 'bounce');

    const animationEndHandler = () => {
      this.renderer.removeClass(element, 'bounce');
      element.removeEventListener('animationend', animationEndHandler);
    };
    element.addEventListener('animationend', animationEndHandler);
  }
}
