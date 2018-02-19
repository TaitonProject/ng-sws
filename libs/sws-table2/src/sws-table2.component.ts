import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SwsPaginationComponent} from 'sws-pagin';

@Component({
  selector: 'sws-table2',
  templateUrl: './sws-table2.component.html',
  styleUrls: ['./sws-table2.component.scss']
})
export class SwsTable2Component implements OnInit, AfterViewInit {

  private paginator: SwsPaginationComponent;
  resultsLength = 100;
  pageSize = 20;
  navigatePage = true;

  @ViewChild('paginator') set content(content: SwsPaginationComponent) {
    this.paginator = content;
  }

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    // console.log('pagin', this.paginator.page);
  }
}
