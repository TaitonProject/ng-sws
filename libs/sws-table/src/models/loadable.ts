import {Observable} from 'rxjs/Observable';
import {FormGroup} from '@angular/forms';

export interface Loadable {
  form: FormGroup;
  func: (form: any, page: number) => any;
  loadData(form: any, page: number): Observable<[Array<any>, number]> | Observable<Array<any>>;
}
