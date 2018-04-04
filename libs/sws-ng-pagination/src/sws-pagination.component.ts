import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'sws-pagination',
  templateUrl: './sws-pagination.component.html',
  styleUrls: ['./sws-pagination.component.scss']
})
export class SwsPaginationComponent implements OnInit {

  @Input() collectionSize: number;
  @Input() pageSize: number;
  @Input() step = 5;
  @Input() page: number;
  @Input() title: string;
  @Input() navigated = true;
  @Input() paginText = 'Элементов на странице';

  @Output() changePageEvent: EventEmitter<number> = new EventEmitter();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params: ParamMap) => console.log('params', params));
    this.subChangePage();
  }

  navigateByPage(page: number) {
    this.router.navigate([], {queryParamsHandling: 'merge', queryParams: {'page': page}});
  }

  subChangePage() {
    this.changePageEvent.subscribe((page: number) => this.changePage(page));
    /*this.page.subscribe((page: number) => {
      console.log('change page', page);
      this.changePage(page);
    });*/
  }

  changePage(page: number) {
    this.navigateByPage(page);
  }

}
