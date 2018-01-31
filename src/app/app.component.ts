import {Component, OnInit, EventEmitter} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {AppService} from './app.service';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';
import {Loadable} from '../../libs/sws-table/src/models/loadable';

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

  constructor(private service: AppService) {
    this.refresh = new EventEmitter<any>();
    this.obs = Observable.of(20);
  }

  ngOnInit(): void {
    this.createFunc();
    this.createForm();
    this.setForm();
  }

  createForm() {
    this.form = new FormGroup({
      org: new FormControl(),
      date: new FormControl(),
      ff: new FormControl()
    });
    setTimeout(() => this.form.controls['org'].patchValue('123123'), 3000);
    //this.form.controls['org'].patchValue('123123')
    //setTimeout(() => this.form.controls['date'].patchValue('1995-02-26'), 3000);
    this.form.controls['date'].patchValue('1995-02-26');
    this.form.controls['date'].setValidators([Validators.required]);
    this.form.valueChanges.subscribe((res) => {
      // console.log('appp', res);
    });
    console.log('form control', this.form.get('org'));
  }

  setDisable() {
    this.form.controls['org'].disable({onlySelf: true, emitEvent: false});
    console.log('form control', this.form.get('org'));
  }

  setEnable() {
    this.form.controls['org'].enable({onlySelf: true, emitEvent: false});
    console.log('form control', this.form.get('org'));
  }

  // setValue(string: any)

  openEvent(event: any) {

  }

  setRegion(region: any) {
    console.log('re', region);
    this.region = region.id;
  }

  setForm() {
    //this.form.controls['org'].patchValue('123123');
    this.form.controls['date'].patchValue('1980-12-01');
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
}
