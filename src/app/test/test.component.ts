import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {AppService} from '../app.service';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  form: FormGroup;
  func: (form: any, min?: number, max?: number) => any;
  users: Array<any>;
  min: number;
  max: number;
  refresh: EventEmitter<any> = new EventEmitter();

  constructor(private service: AppService) {
  }

  ngOnInit() {
    this.createFunc();
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      org: new FormControl(),
      min: new FormControl(),
      max: new FormControl()
    });
    this.form.valueChanges.subscribe(res => console.log('form change', res));
  }

  createFunc() {
    this.func = this.loadData.bind(this);
  }

  setData(data: any) {
    console.log('data', data);
    if (data && data.list){
    this.users = data.list;
    } else {
      this.users = null;
    }
  }

  loadData(form: any, min?: number, max?: number): Observable<[any, number]> {
    this.min = min;
    this.max = max;
    return Observable.combineLatest(this.service.loadData(form, min, max), this.service.loadCountData(form));

    // return Observable.combineLatest(this.service.loadData(form, page));

    // Если нету запроса на кол-во объектов (с небольшим массивом имеем дело)
    /*return Observable.combineLatest(this.service.loadData(form, page), Observable.create(function (observer) {
      observer.next(15);
    }));*/
  }
}
