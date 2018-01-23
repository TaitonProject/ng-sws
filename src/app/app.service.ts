import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AppService {

  public apiUrlMock = 'http://demo8448162.mockable.io/';
  public apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {

  }

  loadData(form: any, page: number): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.apiUrl + '/posts?page=' + page, {params: form});
  }

  loadCountData(form: any): Observable<number> {
    return this.http.get<number>(this.apiUrlMock + '/count', {params: form});
  }
}
