import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AppService {

  public apiUrlMock = 'http://demo8448162.mockable.io/';
  public apiUrl = 'https://jsonplaceholder.typicode.com';
  public erzUrl = 'https://erzrf.ru/erz-rest/api/v1/';

  public eventNavigate: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private http: HttpClient) {

  }

  loadData(form: any, min: number, max: number): Observable<any> {
    min = form['min'] ? form['min'] : min;
    max = form['max'] ? form['max'] : max;
    // min = 500;
    // max = 520;
    const header = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + this.getAccessToken()
    });
    // header.set('Access-Control-Allow-Origin', '*');
    // return this.http.get<Array<any>>(this.apiUrl + '/posts?' + 'min=' + min + '&max=' + max, {params: form, headers: header});
    // return this.http.get<Array<any>>(this.apiUrl + '/posts?' + 'min=' + min + '&max=' + max, {headers: header});
    // return this.http.get<any>('http://192.168.0.167/api/public-rest/data/docnagentt');
    return this.http.get<any>(this.erzUrl + 'gk/table?region=ryazanskaya-oblast&regionKey=144706001&'
      + 'min=' + min + '&max=' + max, {headers: header});

  }

  loadCountData(form: any): Observable<any> {
    const header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    // return Observable.of(null);

    return this.http.get<number>(this.apiUrlMock + '/count', {params: form});
  }

  loadRegions(): Observable<Array<any>> {
    const header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    return this.http.get<Array<any>>('http://sws.by/erzrf/erz-rest/api/v1/global/dictionary?type=building_regions', {headers: header});
  }

  getAccessToken(): string {
    return 'eyJhbGciOiJIUzI1NiJ9.eyJ2aWQiOiIxRkJFMTYwQUFERUE5NDE0NTA5RjAyQ0Q1MUZBN0E3Qjc5QkU0NDQ5IiwiY2xuIjoiMzEyMDk3N0ExMTNQQjgiLCJST0xFIjoiUk9MRV9HT0QiLCJjd3VucCI6IjE5MTY4ODUxNiIsImV4cCI6MTUzNjI3NzQxN30.nFrW06phBa6HXRELkPvNTrkCF_4Pm-MVe7n4bm8vdjw';
  }

}
