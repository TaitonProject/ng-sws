import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AppService {

  public apiUrlMock = 'http://demo8448162.mockable.io/';
  public apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {

  }

  loadData(form: any, min: number, max: number): Observable<Array<any>> {
    const header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    // return this.http.get<Array<any>>(this.apiUrl + '/posts?' + 'min=' + min + '&max=' + max, {params: form, headers: header});
    return this.http.get<Array<any>>(this.apiUrl + '/posts?' + 'min=' + min + '&max=' + max, {headers: header});
  }

  loadCountData(form: any): Observable<number> {
    const header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    return this.http.get<number>(this.apiUrlMock + '/count', {params: form, headers: header});
  }

  loadRegions(): Observable<Array<any>> {
    const header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    return this.http.get<Array<any>>('http://sws.by/erzrf/erz-rest/api/v1/global/dictionary?type=building_regions', {headers: header});
  }
}
