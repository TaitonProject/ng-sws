import { Directive, HostListener, Input, OnDestroy, ElementRef, Renderer2, OnInit, AfterViewInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Directive({
  selector: '[swsLabel]'
})

export class SWSLabelDirective implements AfterViewInit {

  parent;
  refChild;
  id: string ='';
  value: any;

  @Input('swsLabel') label: string = '';

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    this.parent = this.element.nativeElement.parentNode;
    this.refChild = this.element.nativeElement;
    this.renderer.addClass(this.parent, 'sws-form-field');
    this.renderer.addClass(this.refChild, 'sws-form-input');
    
    if (this.label) {
      if(this.element.nativeElement.value) {
        this.addClassToParent('active-lbl');
      }
      this.id = this.element.nativeElement.attributes.id.value
      this.renderer.addClass(this.parent, 'sws-form-field__use-label');
      const lbl = this.renderer.createElement('label');
      const text = this.renderer.createText(this.label);
      this.renderer.addClass(lbl, 'sws-form-input-label');
      this.renderer.appendChild(lbl, text);
      this.renderer.insertBefore(this.parent, lbl, this.refChild);
      //проставляем id и for для элемента и label соотвественно
      this.renderer.setAttribute(this.element.nativeElement, 'id', this.id);
      this.renderer.setAttribute(lbl, 'for', this.id);
    }
  }

  @HostListener('focus') onMouseFocus(): void {
    this.addClassToParent('active');
  }

  @HostListener('focusout') onMouseFocusOut(): void {
    this.removeClassFromParent('active');
    this.addClassToParent('touched');
    if (this.refChildContainClass('ng-invalid')) {
      this.addClassToParent('has-error');
    } else if (this.refChildContainClass('ng-valid') && this.parentContainClass('has-error')) {
      this.removeClassFromParent('has-error');
    }
  }

  @HostListener("input", ["$event.target.value"]) onInput(value) {
    setTimeout(() => {
      if (this.parentContainClass('touched') && this.refChildContainClass('ng-valid')) {
        this.removeClassFromParent('has-error');
      }
      if (this.parentContainClass('touched') && this.refChildContainClass('ng-invalid')) {
        this.addClassToParent('has-error');
      }
    }, 0);
    //проверяем на наличие value в поле для label
    if (value) {
      this.addClassToParent('active-lbl');
    } else {
      this.removeClassFromParent('active-lbl');
    }
  }

  addClassToParent(cl: string) {
    this.renderer.addClass(this.parent, cl);
  }

  removeClassFromParent(cl: string) {
    this.renderer.removeClass(this.parent, cl);
  }

  parentContainClass(cl:string): boolean {
    return this.parent.classList.contains(cl);
  }

  refChildContainClass(cl:string): boolean {
    return this.refChild.classList.contains(cl);
  }

}