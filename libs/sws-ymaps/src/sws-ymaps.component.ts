import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SwsYmapsService} from "./sws-ymaps.service";

declare var ymaps: any;

@Component({
  selector: 'sws-ymaps',
  templateUrl: './sws-ymaps.component.html',
  styleUrls: ['./sws-ymaps.component.scss']
})
export class SwsYmapsComponent implements OnInit, AfterViewInit {

  @ViewChild('mapSaint') mapSaint: ElementRef;
  region: string;
  regions: Array<any>;

  constructor(public service: SwsYmapsService) {
  }

  ngOnInit() {
    this.getRegions();
  }

  ngAfterViewInit(): void {
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
      })
    });
  }

  getRegions() {
    this.service.loadRegions().subscribe(regions => {
      this.regions = regions;
    });
  }
}
