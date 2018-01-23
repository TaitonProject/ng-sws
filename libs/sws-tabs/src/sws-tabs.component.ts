import {
  Component, OnInit, ContentChildren, QueryList, AfterContentInit, Input, AfterViewInit,
  Output, EventEmitter
} from '@angular/core';
import {SwsTabComponent} from './tab/sws-tab.component';

@Component({
  selector: 'tabs',
  templateUrl: './sws-tabs.component.html',
  styleUrls: ['./sws-tabs.component.css']
})
export class SwsTabsComponent implements OnInit, AfterContentInit, AfterViewInit {

  @ContentChildren(SwsTabComponent) tabs: QueryList<SwsTabComponent> = new QueryList<SwsTabComponent>();

  @Input() contentStyle = 'nav';
  @Input() titleStyle = 'nav';
  @Input() disabledTabNum: number;
  @Output() clickIndex: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }

  ngAfterContentInit() {
    const activeTabs = this.tabs.filter((tab) => tab.active);
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first, 0);
    }
  }

  selectTab(tab: SwsTabComponent, index?: any) {
    if (index === this.disabledTabNum) {
      return;
    }
    this.tabs.toArray().forEach(tab => {
      tab.active = false;
    });
    tab.active = true;
    for (let i = 0; i < this.tabs.toArray().length; i++) {
      if (this.tabs.toArray()[i].active === true) {
        this.clickIndex.emit(i);
      }
    }
    tab.download = true;
  }

}
