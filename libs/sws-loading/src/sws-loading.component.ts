import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoadingState } from './models/loading-state';
import 'rxjs/add/operator/distinctUntilChanged';
import { Subscription } from 'rxjs/Subscription';
import { trigger, transition, style, animate, state, query, stagger, keyframes, group } from '@angular/animations';


@Component({
  selector: 'sws-loading, [sws-loading]',
  templateUrl: './sws-loading.component.html',
  styleUrls: ['./sws-loading.component.scss'],
  animations: [
    trigger('cont', [
      transition('start <=> finish', [
        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(':enter', stagger('50ms', [
          animate('450ms cubic-bezier(.25,.8,.25,1)', keyframes([
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(-30%)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
          ]))]), { optional: true }),

        // query(':leave', stagger('100ms', [
        //   animate('450ms cubic-bezier(.25,.8,.25,1)', keyframes([
        //     style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
        //     // style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
        //     style({ opacity: 0, transform: 'translateY(-75%)', offset: 1.0 }),
        //   ]))]), { optional: true })
      ])
    ]),
    trigger('scont', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate(450)
      ]),
      transition(':leave', [
        animate(450, style({ opacity: '0' }))
      ])
    ])
  ]
})
export class SwsLoadingComponent extends LoadingState implements OnInit, OnChanges, OnDestroy {

  @Input() dataObservable: Observable<any>;
  @Input() textNotFound = 'По текущим условиям поиска, записей не найдено.';
  @Input() textError = 'Ошибка загрузки данных, повторите попытку чуть позже.';
  @Input() download = false;
  @Input() spinnerType: string; // can be 'round', 'dots'; default: 'round'
  @Output() dataOut: EventEmitter<any> = new EventEmitter();

  data: any;
  oldObs: Observable<any>;
  downloadChange = false;
  subscription: Subscription = new Subscription();

  constructor() {
    super();
  }

  ngOnInit() {
    this.oldObs = this.dataObservable;
    if (this.download && this.dataObservable) {
      this.loadData();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // если используется состояние таба\аккордиона как критерий для загрузки
    if (typeof this.download === 'boolean') {
      // при первом открытии аккордиона\табы
      if (this.download && !this.downloadChange) {
        this.downloadChange = true;
        this.loadData();
      }
      // если был изменен observable и аккордион\таб открыт
      if (this.dataObservable !== this.oldObs && this.download) {
        this.loadData();
        this.oldObs = this.dataObservable;
      }
    } else {
      // если используется Observable как критерий для загрузки
      if (!changes['dataObservable'].firstChange) {
        this.loadData();
      }
    }
  }

  loadData() {
    super.startLoad();
    if (this.dataObservable !== undefined) {
      this.subscription.add(this.dataObservable.distinctUntilChanged().subscribe(
        response => {
          this.data = response;
          this.dataOut.emit(response);
        },
        error => super.errorLoad(error),
        () => super.finishLoad(this.data)));
    } else {
      super.finishLoad({});
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
