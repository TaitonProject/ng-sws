import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'sws-ngb-pagination',
  templateUrl: './sws-ngb-pagination.component.html',
  styleUrls: ['./sws-ngb-pagination.component.scss']
})
export class SwsNgbPaginationComponent implements OnInit {

  @Input() collectionSize: number;
  @Input() pageSize: number;
  @Input() step = 5;
  @Input() page: number;
  @Input() title: string;
  @Input() navigated = true;
  @Input() paginText = 'Элементов на странице';

  @Output() changePageEvent: EventEmitter<number> = new EventEmitter();

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.subChangePage();
  }

  navigateByPage(page: number) {
    this.router.navigate([], {queryParamsHandling: 'merge', queryParams: {'page': page}});
  }

  subChangePage() {
    this.changePageEvent.subscribe((page: number) => this.changePage(page));
  }

  changePage(page: number) {
    this.page = page;
    this.navigateByPage(page);
  }

}
