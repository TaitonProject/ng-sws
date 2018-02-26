import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {SwsTabsComponent} from '../../../libs/sws-tabs/src/sws-tabs.component';
import {AppService} from '../app.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit, AfterViewInit {

  @ViewChild('tabs') tabsElem: SwsTabsComponent;

  constructor(private activatedRoute: ActivatedRoute, private service: AppService) {
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.subParams();
  }

  subParams() {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.selectTab(+param.get('section'));
    });
  }

  selectTab(index: number) {
    this.tabsElem.selectTab(this.tabsElem.tabs.toArray()[index - 1]);
    this.service.eventNavigate.next(index - 1);
  }
}
