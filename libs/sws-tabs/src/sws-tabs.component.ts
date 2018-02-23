import {
  Component, OnInit, ContentChildren, QueryList,
  Output, EventEmitter, AfterContentInit
} from '@angular/core';
import {SwsTabComponent} from './tab/sws-tab.component';

@Component({
  selector: 'tabs',
  templateUrl: './sws-tabs.component.html',
  styleUrls: ['./sws-tabs.component.css']
})
export class SwsTabsComponent implements OnInit, AfterContentInit {

  @ContentChildren(SwsTabComponent) tabs: QueryList<SwsTabComponent> = new QueryList<SwsTabComponent>();
  @Output() clickIndex: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    const activeTabs = this.tabs.filter((tab: SwsTabComponent) => tab.active);
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: SwsTabComponent) {
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
