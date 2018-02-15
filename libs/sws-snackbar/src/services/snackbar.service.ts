import {
  Injectable,
  Injector,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  ApplicationRef,
  ComponentRef,
  Renderer2,
  RendererFactory2,
  Inject,
  ElementRef
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SwsSnackbarComponent } from '../sws-snackbar.component';

@Injectable()
export class SnackbarService {

  private renderer: Renderer2;
  div: ElementRef;
  duration: number = 4000;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  createSnackbar(type: string, message: string, duration?: number, horizontalPosition?: string) {
    // Создаем ссылку на компонент
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(SwsSnackbarComponent)
      .create(this.injector);

    componentRef.instance.type = type;
    componentRef.instance.message = message;

    // Добавляем в дерево компонентов чтобы могли отслеживать изменения
    this.appRef.attachView(componentRef.hostView);

    // Создаем DOM элемент
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    //Создаем обертку
    if (!this.div) {
      this.div = this.renderer.createElement('div');
      this.renderer.addClass(this.div, 'sws-snackbar');
      this.renderer.appendChild(this.document.body, this.div);
    }

    // Вставляем в DOM дерево
    this.renderer.appendChild(this.div, domElem);

    // Wait some time and remove it from the component tree and from the DOM
    setTimeout(() => {
      this.destroySnackbar(componentRef);
    }, duration ? duration : this.duration);

    componentRef.instance.close.subscribe(() => {
      this.destroySnackbar(componentRef);
    });

  }

  destroySnackbar(componentRef) {
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }

}