import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoadingState } from './models/loading-state';
import { distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'sws-loading-udfl, [sws-loading-udfl]',
  templateUrl: './sws-loading.component.html',
  styleUrls: ['./sws-loading.component.scss']
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
      this.subscription.add(this.dataObservable.pipe(distinctUntilChanged()).subscribe(
        response => {
          if (response[0] instanceof HttpResponse || response[1] instanceof HttpResponse) {
            if (response[0].status === 204 || response[1].status === 204) {
              super.finishLoad(null);
            } else {
              this.data = [response[0].body, response[1].body];
              this.dataOut.emit(this.data);
            }
          } else {
            if (response[0] == null || response[1] == null){
              this.finishLoad(null);
            } else {
              this.data = response;
              this.dataOut.emit(response);
            }
          }
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
