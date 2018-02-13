import {
  Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges,
  ChangeDetectorRef
} from '@angular/core';
import {LoadingState} from 'sws-loading';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'tab',
  templateUrl: './sws-tab.component.html',
  styleUrls: ['./sws-tab.component.css']
})
export class SwsTabComponent extends LoadingState implements OnInit, OnChanges {

  @Input() active = false;
  @Input() dataObs: Observable<any>;
  @Input() title: string;
  @Input() id: string;
  @Output() dataOut: EventEmitter<any> = new EventEmitter();

  data: any;
  download = false;

  constructor(private cdRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      switch (propName) {
        case 'active': {
          if (this.active && this.dataObs && !this.loading) {
            this.download = true;
            this.cdRef.detectChanges();
          }
          break;
        }
        /**
         * Сеттер для dataObservable, проверяем прошлое значение observable, ставим новое
         * Если данные с таким observable были загружены, то не загружаем
         * */

        /*case 'dataObs': {
          if (changes['dataObs'].previousValue == this.dataObs) {
            this.isLoadingData = true;
          } else {
            changes['dataObs'].currentValue = this.dataObs;
            this.dataObs = changes['dataObs'].previousValue;
            this.isLoadingData = false;
          }
          break;
        }*/
      }
    }
  }

  /**
   * Если вкладка активна, observable не undefined,
   * Данные с такой формой\запросом еще не были загружены,
   * И в данный момент не загружаются - возвращаем true
   * */
  needThisLoad(): boolean {
    if (this.active && this.dataObs && !this.loading && this.download) {
      return true;
    }
    return false;
  }

  setData(data: any) {
    this.data = data;
    this.dataOut.emit(data);
  }

}
