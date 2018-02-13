import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'sws-pagination',
  templateUrl: './sws-pagination.component.html',
  styleUrls: ['./sws-pagination.component.scss']
})
export class SwsPaginationComponent implements OnInit, OnChanges {


  @Input() collectionSize: number;
  @Input() pageSize: number;
  @Input() step = 5;
  @Input() page = 1;
  @Input() title: string;
  @Input() navigated = true;

  @Output() changePage: EventEmitter<number> = new EventEmitter();

  startIndex: number;
  endIndex: number;
  pagesCount: number;
  pages: Array<number>;

  constructor(private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    if (this.navigated === true) {
      this.route.queryParams.subscribe(params => {
        this.calculateIndexes(params['page'] != null ? +params['page'] : 1)
      });
    } else {
      this.calculateIndexes(1);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
    if (changes['page'] && !changes['page'].firstChange) {
      this.calculateIndexes(changes['page'].currentValue);
      this.clickPage(changes['page'].currentValue);
    }
  }

  calculateIndexes(page: number): void {
    page = page != 0 ? page : 1;
    this.page = page;
    this.pagesCount = Math.round(this.collectionSize / this.pageSize);
    this.pagesCount = this.pagesCount < ( this.collectionSize / this.pageSize ) ? this.pagesCount + 1 : this.pagesCount;
    if (page > 1 && page <= this.step) {
      this.fillPages(1, false);
    } else {
      if (page > this.pagesCount) {
        return;
      }
      if (( page % this.step ) == 0) {
        page--;
      }
      while (( page % this.step ) != 0) {
        page--;
      }
      this.fillPages(page + 1, false);
    }
  }

  fillPages(pageIndex: number, reduse: boolean): void {
    this.pages = new Array();
    this.startIndex = reduse ? ( pageIndex - ( this.step - 1 ) ) : pageIndex;
    this.endIndex = reduse ? pageIndex : ( pageIndex + this.step - 1 );
    if (this.endIndex > this.pagesCount) {
      this.endIndex = this.pagesCount;
    }
    if (this.startIndex <= 0) {
      this.startIndex = 1;
    }
    for (let i = this.startIndex; i <= this.endIndex; i++) {
      this.pages.push(i);
    }
  }

  /**
   * Логика пагинатора без подписки на queryParams
   * */

  clickPage(page: number) {
    if ((page > 0 || page <= this.pagesCount) && (page != this.page)) {
      this.page = page;
      if (this.navigated) {
        this.navigateByPage(this.page);
      }
      this.calculateIndexes(this.page);
      this.changePage.emit(this.page);
    }
  }

  navigateByPage(page: number) {
    this.router.navigate([], {queryParamsHandling: 'merge', queryParams: {'page': page}});
  }

}
