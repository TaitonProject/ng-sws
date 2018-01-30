import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {SwsYmapsService} from './sws-ymaps.service';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {Select2OptionData} from './models/Select2OptionData';
import {filter} from 'rxjs/operators/filter';
import {distinctUntilChanged} from 'rxjs/operators/distinctUntilChanged';

declare var ymaps: any;

@Component({
  selector: 'sws-ymaps',
  templateUrl: './sws-ymaps.component.html',
  styleUrls: ['./sws-ymaps.component.scss']
})
export class SwsYmapsComponent implements OnInit, OnDestroy {

  @Output() eventRegion: EventEmitter<Select2OptionData>;
  value: any;
  region: string;
  regions: Array<any>;
  eventLocation: EventEmitter<string>;
  subscription: Subscription;
  ready: Observable<any>;

  constructor(public service: SwsYmapsService) {
    this.eventRegion = new EventEmitter();
    this.eventLocation = new EventEmitter();
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.ready = Observable.of(ymaps).pipe(filter(res => res !== 'undefined'), distinctUntilChanged());
    this.subscription.add(this.ready.subscribe(res => this.setLocation()));
    this.subscription.add(Observable.combineLatest(this.eventLocation, this.service.loadRegions()).subscribe(response => {
      this.regions = this.excludeWrongRegion(response[1]);
      this.setRegion(this.regions, response[0]);
    }));
  }

  setLocation() {
    const self = this;
    ymaps.ready(function () {
      ymaps.geolocation.get({
        // Зададим способ определения геолокации
        // на основе ip пользователя.
        // provider: 'yandex',
        // Включим автоматическое геокодирование результата.
        autoReverseGeocode: true
      }).then(function (result) {
        // Выведем результат геокодирования.
        self.region = result.geoObjects.get(0).properties.get('metaDataProperty').GeocoderMetaData.Address.Components[2].name;
        self.eventLocation.emit(self.region);
      });
    });
  }

  excludeWrongRegion(array: Array<any>): Array<any> {
    array.splice(1, 1);
    return array;
  }

  setRegion(regionArray: Array<any>, selectedRegion: any) {
    this.value = regionArray.find(region => (region.text === selectedRegion || region.text === 'г.' + selectedRegion));
    if (!this.value) {
      this.value = regionArray[0];
    }
    this.eventRegion.emit(this.value);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
