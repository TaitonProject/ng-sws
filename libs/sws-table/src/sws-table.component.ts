import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/observable/merge';

@Component({
  selector: 'sws-table',
  templateUrl: './sws-table.component.html',
  styleUrls: ['./sws-table.component.scss']
})
export class SwsTableComponent implements OnInit, OnDestroy {

  @Input() form: FormGroup = new FormGroup({});
  @Input() func: (form: any, page: number) => any;
  @Input() pageSize = 10;
  @Output() data: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();

  obsData: Observable<any>;
  page: BehaviorSubject<number> = new BehaviorSubject(1);
  resultsLength: number;
  subscriptions: Subscription;

  constructor() {
    this.subscriptions = new Subscription();
  }

  ngOnInit() {
    this.subChange();
  }

  subChange() {
    const displayDataChanges = [
      this.form.valueChanges,
      this.page,
    ];
    this.obsData = Observable.merge(...displayDataChanges);
    this.subscriptions.add(
      this.obsData.subscribe(() => {
        this.obsData = this.func(this.form.value, this.page.getValue());
      })
    );
  }

  dataOut(data: any) {
    this.data.emit(data[0]);
    this.resultsLength = data[1];
  }

  ngOnDestroy(): void {
    if (this.subscriptions != null) {
      this.subscriptions.unsubscribe();
    }
  }
}
