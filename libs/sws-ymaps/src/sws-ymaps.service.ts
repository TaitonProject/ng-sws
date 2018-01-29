import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SwsYmapsService {

  constructor(private http: HttpClient) {
  }

  loadRegions(): Observable<Array<any>> {
    return this.http.get<Array<any>>('http://sws.by/erzrf/erz-rest/api/v1/global/dictionary?type=building_regions');
  }
}
