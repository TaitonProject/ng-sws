import { Directive, HostListener, Input, OnDestroy, ElementRef, Renderer2, OnInit } from "@angular/core";

@Directive({
  selector: '[sws-hint]'
})

export class SwsHintDirective implements OnInit, OnDestroy {

  position: string;
  span;
  @Input('sws-hint') hintTitle: string = '';
  @Input('sws-hint-pos') hintPosition: string = 'right';

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    
    //this.renderer.addClass(this.element.nativeElement, 'sws-hint-wrapper');
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.renderer.addClass(this.element.nativeElement, 'sws-hint__active');
    this.span = this.renderer.createElement('span');
    const text = this.renderer.createText(this.hintTitle);
    this.renderer.addClass(this.span, 'sws-hint');
    this.renderer.addClass(this.span, this.position);
    this.renderer.appendChild(this.span, text);
    this.renderer.appendChild(this.element.nativeElement, this.span);
    this.onSetPosition(this.hintPosition);
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.renderer.removeClass(this.element.nativeElement, 'sws-hint__active');
    this.renderer.removeChild(this.element.nativeElement, this.span);
  }

  ngOnDestroy(): void {
    // hide hint
  }

  onSetPosition(pos: string) {
    switch (pos) {
      case 'bottom': {
        this.position = 'sws-hint__bottom';
          this.renderer.setStyle(this.span, 'top', this.element.nativeElement.offsetHeight + this.getPositionTop() +'px');
          this.renderer.setStyle(this.span, 'left', this.getPositionLeft() + 'px')
        /* let div = this.renderer.createElement('div');
        this.renderer.addClass(div, 'sws-hint-arrow');
        this.renderer.addClass(div, 'sws-hint-arrow__bottom');
        this.renderer.appendChild(this.element.nativeElement, div); */
        break;
      }
      case 'left': {
        this.position = 'sws-hint__left';
          this.renderer.setStyle(this.span, 'top', this.getPositionTop()+'px');
          this.renderer.setStyle(this.span, 'right', window.innerWidth -this.getPositionLeft() + 20 + 'px')
        /* let div = this.renderer.createElement('div');
        this.renderer.addClass(div, 'sws-hint-arrow');
        this.renderer.addClass(div, 'sws-hint-arrow__right');
        this.renderer.appendChild(this.element.nativeElement, div); */
        break;
      }
      case 'top': {
        this.position = 'sws-hint__top';
       
          this.renderer.setStyle(this.span, 'top', this.getPositionTop() - 20 +'px');
          this.renderer.setStyle(this.span, 'left', this.getPositionLeft() + 'px')
        /* let div = this.renderer.createElement('div');
        this.renderer.addClass(div, 'sws-hint-arrow');
        this.renderer.addClass(div, 'sws-hint-arrow__top');
        this.renderer.appendChild(this.element.nativeElement, div); */
        break;
      }
      default: {
        this.position = 'sws-hint__right';
        //Добавляем координаты для tooltip относительно окна
          this.renderer.setStyle(this.span, 'top', this.getPositionTop()+'px');
          this.renderer.setStyle(this.span, 'left', this.getPositionRight()+ 20 + 'px');
        /* let div = this.renderer.createElement('div');
        this.renderer.addClass(div, 'sws-hint-arrow');
        this.renderer.addClass(div, 'sws-hint-arrow__left');
        this.renderer.appendChild(this.element.nativeElement, div); */
        break;
      }
    }
  }

  getPositionTop(): number {
   return this.element.nativeElement.getBoundingClientRect().top;
  }
  getPositionLeft(): number {
    return this.element.nativeElement.getBoundingClientRect().left;
   }
   getPositionBottom(): number {
    return this.element.nativeElement.getBoundingClientRect().bottom;
   }
   getPositionRight(): number {
    return this.element.nativeElement.getBoundingClientRect().right;
   }
}