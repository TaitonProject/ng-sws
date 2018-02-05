import { Directive, HostListener, Input, OnDestroy, ElementRef, Renderer2, OnInit, AfterViewInit } from "@angular/core";
import { FormControl } from "@angular/forms";

@Directive({
  selector: '[swsLabel]'
})

export class SwsLabelDirective implements AfterViewInit {

  parent;
  refChild;
  id: string = '';
  value: any;

  @Input('swsLabel') label: string = '';
  @Input('formControl') formControl: FormControl;

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    this.subFormControl();
    this.parent = this.element.nativeElement.parentNode;
    this.refChild = this.element.nativeElement;

    if (this.label) {
      if (this.element.nativeElement.value) {
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

  subFormControl(){
    this.formControl.valueChanges.subscribe(res => {
      if (res && res != ''){
        this.addClassToParent('active-lbl');
      } else {
        this.removeClassFromParent('active-lbl');
      }
    })
  }

  @HostListener('focus') onMouseFocus(): void {
    this.addClassToParent('active');
  }

  @HostListener('focusout') onMouseFocusOut(): void {
    this.removeClassFromParent('active');
  }

  /* @HostListener('keyup', ['$event.target.value']) onInput(value) {
    //проверяем на наличие value в поле для label
    if (value) {
      this.addClassToParent('active-lbl');
    } else {
      this.removeClassFromParent('active-lbl');
    }
  } */

  addClassToParent(cl: string) {
    this.renderer.addClass(this.parent, cl);
  }

  removeClassFromParent(cl: string) {
    this.renderer.removeClass(this.parent, cl);
  }

  parentContainClass(cl: string): boolean {
    return this.parent.classList.contains(cl);
  }

  refChildContainClass(cl: string): boolean {
    return this.refChild.classList.contains(cl);
  }

}