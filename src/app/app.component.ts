import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {AppService} from './app.service';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';
import {Loadable} from '../../libs/sws-table/src/models/loadable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, Loadable {

  form: FormGroup;
  func: (form: any, min?: number, max?: number) => any;
  users: Array<any>;
  obs: Observable<number>;
  region: any;
  refresh: EventEmitter<any>;
  errorObs: BehaviorSubject<any> = new BehaviorSubject(null);
  successObs: BehaviorSubject<any> = new BehaviorSubject(null);
  successMsg = 'Успешно сохранено';
  errorMsg = 'Ошибка';

  constructor(private service: AppService) {
    this.refresh = new EventEmitter<any>();
    this.obs = Observable.of(20);
  }

  ngOnInit(): void {
    this.createFunc();
    this.createForm();
  }

  getWord(message: string) {
    if (message.length > 1) {
      this.successObs.next(this.successMsg);
    } else {
      this.errorObs.next(this.errorMsg);
    }
  }

  createForm() {
    this.form = new FormGroup({
      org: new FormControl()
    });
    this.form.valueChanges.subscribe(res => console.log('form change', res));
  }

  createFunc() {
    this.func = this.loadData.bind(this);
  }

  setData(data: Array<any>) {
    this.users = data;
  }

  loadData(form: any, min?: number, max?: number): Observable<[Array<any>, number]> {
    return Observable.combineLatest(this.service.loadData(form, min, max), this.service.loadCountData(form));

    // return Observable.combineLatest(this.service.loadData(form, page));

    // Если нету запроса на кол-во объектов (с небольшим массивом имеем дело)
    /*return Observable.combineLatest(this.service.loadData(form, page), Observable.create(function (observer) {
      observer.next(15);
    }));*/
  }

  openEvent(event: any) {
    console.log('openEvent open!');
  }

}
