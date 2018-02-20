import { Component, Input } from '@angular/core';
import { SwsAccordionGroupComponent } from './sws-accordion-group/sws-accordion-group.component';

@Component({
  selector: 'sws-accordion',
  templateUrl: './sws-accordion.component.html',
  styleUrls: ['./sws-accordion.component.scss'],
})
export class SwsAccordionComponent {

  openIndex: number;
  groups: Array<SwsAccordionGroupComponent> = [];
  @Input() isOpenAll: boolean = false;

  addGroup(group: SwsAccordionGroupComponent): void {
    this.groups.push(group);
  }

  closeOthers(openGroup: SwsAccordionGroupComponent): void {
    /* this.groups.forEach((group: SwsAccordionGroupComponent) => {
      if (group.isOpen) {
        console.log('openGroup', openGroup)
        console.log('group.index', group.index)
        console.log('group', group)
        group.hasErrorOut = true;
      }
      if (group !== openGroup) {
        group.isOpen = false;
        group.showAccord = 'hdn';
      }
    }); */
    if (this.isOpenAll) {
      return;
    }
    let findIndex;
    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i] !== openGroup) {
        this.groups[i].isOpen = false;
        this.groups[i].showAccord = 'hdn';
      } else {
        findIndex = i;
      }
    }
    //this.groups[findIndex].hasErrorOutput.emit();
    /* for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].isOpen) {
        console.log('is Open', this.groups[i].heading);
        console.log('закрываем предыдущий');
        this.groups[i - 1].hasErrorOutput.emit();
      }
    } */
  }

  removeGroup(group: SwsAccordionGroupComponent): void {
    const index = this.groups.indexOf(group);
    if (index !== -1) {
      this.groups.splice(index, 1);
    }
  }

}
