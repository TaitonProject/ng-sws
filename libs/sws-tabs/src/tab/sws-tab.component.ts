import {
  Component, Input, Output, EventEmitter, ElementRef, Renderer2, AfterViewInit
} from '@angular/core';
import {LoadingState} from 'sws-loading';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'tab',
  templateUrl: './sws-tab.component.html',
  styleUrls: ['./sws-tab.component.css']
})
export class SwsTabComponent extends LoadingState implements AfterViewInit {

  @Input() id: any;
  @Input()
  set active(value) {
    console.log('active ser');
    this._active = value;
    if (this._active) {
      this.active$.next(true);
    } else {
      this.active$.next(false);
    }
  }

  get active(): boolean {
    return this._active;
  }

  @Input() title: string;
  @Input() dataObs: Observable<any>;
  @Output() dataOut: EventEmitter<any> = new EventEmitter();

  active$: Subject<boolean> = new Subject();
  _active = false;
  download = false;

  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
    super();
  }

  ngAfterViewInit(): void {
    this.active$.subscribe(res => {
      if (res) {
        this.renderer.addClass(this.elementRef.nativeElement, 'active');
      } else {
        this.renderer.removeClass(this.elementRef.nativeElement, 'active');
      }
    });
  }
}
