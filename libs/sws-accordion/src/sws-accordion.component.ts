import {Component} from '@angular/core';
import {SwsAccordionGroupComponent} from "./sws-accordion-group/sws-accordion-group.component";

@Component({
  selector: 'sws-accordion',
  templateUrl: './sws-accordion.component.html',
  styleUrls: ['./sws-accordion.component.scss'],
})
export class SwsAccordionComponent {

  groups: Array<SwsAccordionGroupComponent> = [];

  addGroup(group: SwsAccordionGroupComponent): void {
    this.groups.push(group);
  }

  closeOthers(openGroup: SwsAccordionGroupComponent): void {
    this.groups.forEach((group: SwsAccordionGroupComponent) => {
      if (group !== openGroup) {
        group.isOpen = false;
        group.showAccord = 'hdn';
      }
    });
  }

  removeGroup(group: SwsAccordionGroupComponent): void {
    const index = this.groups.indexOf(group);
    if (index !== -1) {
      this.groups.splice(index, 1);
    }
  }

}
