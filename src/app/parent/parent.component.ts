import {AfterViewInit, Component, ComponentFactory, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {ChildComponent} from '../child/child.component';
import {AdHostDirective} from '../ad-host.directive';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    this.childComponent.eventString.subscribe(res => {
      console.log('string res!', res);
    })
  }

  @ViewChild(ChildComponent) childComponent: ChildComponent;
  @ViewChild(AdHostDirective) adHost: AdHostDirective;
  inputVal: string;
  component: ComponentFactory<ChildComponent>;
  index = 0;
  gg: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    this.componentFactoryResolver.resolveComponentFactory(ChildComponent);
  }

  createChild() {
    this.index++;
    this.gg = this.adHost.viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(ChildComponent));
    this.gg.instance.data = '123' + this.index;
    console.log('length', this.adHost.viewContainerRef);
  }

  setDataChild() {
    this.index++;
    this.childComponent.data = 'ggggg';
    // this.adHost.viewContainerRef.element.nativeElement['data'] = this.index.toString();
    // console.log(this.adHost.elemData);
  }

  destroyChild() {
    this.gg.instance.data = '666';
    // this.adHost.viewContainerRef.remove();
    // this.adHost.viewContainerRef.get(+this.inputVal).destroy();
    // console.log(this.adHost.viewContainerRef.get(this.index));
  }

  getComponent() {
    // this.adHost.viewContainerRef.element.nativeElement
    // this.adHost.viewContainerRef.get(2).destroy();
    console.log(this.adHost.viewContainerRef.get(+this.inputVal));
  }
}
