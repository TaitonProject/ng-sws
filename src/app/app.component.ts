import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
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
  }
}
