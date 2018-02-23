import {
  Component, OnInit, ContentChildren, QueryList, AfterViewInit,
  Output, EventEmitter, AfterContentInit
} from '@angular/core';
import {SwsTabComponent} from './tab/sws-tab.component';

@Component({
  selector: 'tabs',
  templateUrl: './sws-tabs.component.html',
  styleUrls: ['./sws-tabs.component.css']
})
export class SwsTabsComponent implements OnInit, AfterViewInit, AfterContentInit {

  @ContentChildren(SwsTabComponent) tabs: QueryList<SwsTabComponent> = new QueryList<SwsTabComponent>();
  @Output() clickIndex: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

  }

  ngAfterContentInit(): void {
    const activeTabs = this.tabs.filter((tab) => tab.active);
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first, 0);
    }
  }

  selectTab(tab: SwsTabComponent, index: number) {
    console.log('click index', index);
    console.log('tab', tab);
    this.tabs.forEach((elemTab: SwsTabComponent) => {
      if (elemTab === tab) {
        elemTab.active = true;
        elemTab.download = true;
      } else {
        elemTab.active = false;
      }
    });
  }

}
