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

  @Input() form: FormGroup;
  @Input() func: ((form: any, page: number) => any);
  @Input() pageSize = 10;
  @Input() navigatePage = false;
  @Input() refresh: EventEmitter<any>;
  @Output() data: EventEmitter<Array<any>>;

  obsData: Observable<any>;
  page: BehaviorSubject<number>;
  resultsLength: number;
  subscriptions: Subscription;

  constructor() {
    this.form = new FormGroup({});
    this.refresh = new EventEmitter<any>();
    this.subscriptions = new Subscription();
    this.page = new BehaviorSubject(1);
    this.data = new EventEmitter<Array<any>>();
  }

  ngOnInit() {
    this.subChange();
  }

  subChange() {
    const displayDataChanges = [
      this.form.valueChanges,
      this.page,
      this.refresh
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
    if (data[1] == null && data[0] != null) {
      this.resultsLength = data[0].length;
    } else if (data[1] != null) {
      this.resultsLength = data[1];
    } else {
      this.resultsLength = null;
    }
  }

  ngOnDestroy(): void {
    if (this.subscriptions != null) {
      this.subscriptions.unsubscribe();
    }
  }
}
