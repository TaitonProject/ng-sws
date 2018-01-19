import { Directive, HostListener, Input, OnDestroy, ElementRef, Renderer2, OnInit } from "@angular/core";

@Directive({
  selector: '[sws-hint]'
})

export class SwsHintDirective implements OnInit, OnDestroy {

  position: string;
  @Input('sws-hint') hintTitle: string = '';
  @Input('sws-hint-pos') hintPosition: string = 'right';

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.onSetPosition(this.hintPosition);
    const span = this.renderer.createElement('span');
    const text = this.renderer.createText(this.hintTitle);
    this.renderer.addClass(span, 'sws-hint');
    this.renderer.addClass(span, this.position);
    this.renderer.appendChild(span, text);
    this.renderer.appendChild(this.element.nativeElement, span);
    this.renderer.addClass(this.element.nativeElement, 'sws-hint-wrapper');
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.renderer.addClass(this.element.nativeElement, 'sws-hint__active');
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.renderer.removeClass(this.element.nativeElement, 'sws-hint__active');
  }

  ngOnDestroy(): void {
    // hide hint
  }

  onSetPosition(pos: string) {
    switch (pos) {
      case 'bottom': {
        this.position = 'sws-hint__bottom';
        let div = this.renderer.createElement('div');
        this.renderer.addClass(div, 'sws-hint-arrow');
        this.renderer.addClass(div, 'sws-hint-arrow__bottom');
        this.renderer.appendChild(this.element.nativeElement, div);
        break;
      }
      case 'left': {
        this.position = 'sws-hint__left';
        let div = this.renderer.createElement('div');
        this.renderer.addClass(div, 'sws-hint-arrow');
        this.renderer.addClass(div, 'sws-hint-arrow__right');
        this.renderer.appendChild(this.element.nativeElement, div);
        break;
      }
      case 'top': {
        this.position = 'sws-hint__top';
        let div = this.renderer.createElement('div');
        this.renderer.addClass(div, 'sws-hint-arrow');
        this.renderer.addClass(div, 'sws-hint-arrow__top');
        this.renderer.appendChild(this.element.nativeElement, div);
        break;
      }
      default: {
        this.position = 'sws-hint__right';
        let div = this.renderer.createElement('div');
        this.renderer.addClass(div, 'sws-hint-arrow');
        this.renderer.addClass(div, 'sws-hint-arrow__left');
        this.renderer.appendChild(this.element.nativeElement, div);
        break;
      }
    }
  }

}