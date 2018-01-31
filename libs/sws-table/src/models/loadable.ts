import {Observable} from 'rxjs/Observable';
import {FormGroup} from '@angular/forms';

export interface Loadable {
  form: FormGroup;
  func: (form: any, min?: number, max?: number) => any;
  loadData(form: any, min?: number, max?: number): Observable<[Array<any>, number]> | Observable<Array<any>>;
}
