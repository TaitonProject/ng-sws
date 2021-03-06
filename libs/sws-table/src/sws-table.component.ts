import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {debounceTime, takeWhile} from 'rxjs/operators';
import 'rxjs/add/observable/merge';
import {SwsNgbPaginationComponent} from 'sws-ngb-pagination';

@Component({
  selector: 'sws-table',
  templateUrl: './sws-table.component.html',
  styleUrls: ['./sws-table.component.scss']
})
export class SwsTableComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() form: FormGroup;
  @Input() func: ((form: any, min?: number, max?: number) => any);
  @Input() pageSize = 10;
  @Input() navigatePage = false;
  @Input() refresh: EventEmitter<any>;
  @Input() showAll: boolean;
  @Input() spinnerType = 'round';
  @Input() paginText = 'Элементов на странице';
  @Input() response = false;

  @Output() data: EventEmitter<Array<any>>;

  @ViewChild('paginator') paginator: SwsNgbPaginationComponent;

  obsData: Observable<any>;
  obsLoadingData: Observable<any>;
  page: BehaviorSubject<number>;
  resultsLength: number;
  subscriptions: Subscription;

  constructor(private activatedRoute: ActivatedRoute) {
    this.refresh = new EventEmitter<any>();
    this.subscriptions = new Subscription();
    this.data = new EventEmitter<Array<any>>();
  }

  ngOnInit() {
    this.initForm();
  }

  ngAfterViewInit(): void {
    let complete = false;
    this.activatedRoute.queryParamMap.pipe(takeWhile(() => !complete), debounceTime(20)).subscribe((params: ParamMap) => {
      this.page = new BehaviorSubject(params.get('page') ? +params.get('page') : 1);
      this.subChange();
      complete = true;
    });
  }

  initForm() {
    if (!this.form) {
      this.form = new FormGroup({});
    }
  }

  subChange() {
    const displayDataChanges = [
      this.form.valueChanges,
      this.page,
      this.refresh
    ];
    this.obsData = Observable.merge(...displayDataChanges);
    this.subscriptions.add(
      this.obsData.subscribe((res) => {
        if (!this.showAll) {
          if (typeof res === 'number') {
            this.obsLoadingData = this.func(
              this.form.value, this.calculateMin(this.page.getValue()), this.calculateMax(this.page.getValue())
            );
          } else {
            this.paginator.changePageEvent.next(1);
            this.paginator.navigateByPage(1);
          }
        } else {
          this.obsLoadingData = this.func(this.form.value);
        }
      })
    );
  }

  dataOut(data: any) {
    if (!this.showAll) {
      if (data[1] == null && data[0] != null) {
        this.resultsLength = data[0].length;
      } else if (data[1] != null) {
        this.resultsLength = data[1];
      } else {
        this.resultsLength = null;
      }
      this.data.emit(data[0]);
    } else {
      this.data.emit(data);
    }
  }

  calculateMin(page: number): number {
    return (page - 1) * this.pageSize + 1;
  }

  calculateMax(page: number): number {
    return this.pageSize * page;
  }

  ngOnDestroy(): void {
    if (this.subscriptions != null) {
      this.subscriptions.unsubscribe();
    }
  }

}
