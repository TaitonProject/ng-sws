import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {AppService} from './app.service';
import 'rxjs/add/observable/combineLatest';
import {Loadable} from '../../libs/sws-table/src/models/loadable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, Loadable {

  form: FormGroup;
  func: (form: any, page: number) => any;
  users: Array<any>;

  constructor(private service: AppService) {
  }

  ngOnInit(): void {
    this.createFunc();
    this.createForm();
    this.setForm();
  }

  createForm() {
    this.form = new FormGroup({
      org: new FormControl(),
      date: new FormControl()
    });
    setTimeout(() => this.form.controls['org'].patchValue('123123'), 3000);
    //this.form.controls['org'].patchValue('123123')
    //setTimeout(() => this.form.controls['date'].patchValue('1995-02-26'), 3000);
    this.form.controls['date'].patchValue('1995-02-26');
    this.form.controls['date'].setValidators([Validators.required]);
    this.form.controls['org'].setValidators([Validators.required]);
    this.form.valueChanges.subscribe((res) => {
      // console.log('appp', res);
    });
  }

  setForm() {
    this.form.controls['org'].patchValue('123123');
    this.form.controls['date'].patchValue('1980-12-01');
  }

  createFunc() {
    this.func = this.loadData.bind(this);
  }

  setData(data: Array<any>) {
    this.users = data;
  }

  loadData(form: any, page: number): Observable<[Array<any>, number]> {
    return Observable.combineLatest(this.service.loadData(form, page), this.service.loadCountData(form));

    // return Observable.combineLatest(this.service.loadData(form, page));

    // Если нету запроса на кол-во объектов (с небольшим массивом имеем дело)
    /*return Observable.combineLatest(this.service.loadData(form, page), Observable.create(function (observer) {
      observer.next(15);
    }));*/
  }
}
