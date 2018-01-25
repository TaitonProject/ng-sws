import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[ad-host]'
})
export class AdHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) {

  }

}
