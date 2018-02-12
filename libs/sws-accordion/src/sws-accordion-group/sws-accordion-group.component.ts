import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SwsAccordionComponent} from '../sws-accordion.component';

@Component({
  selector: 'sws-accordion-group',
  templateUrl: './sws-accordion-group.component.html',
  styleUrls: ['./sws-accordion-group.component.scss'],
  animations: [
    trigger('acc', [
      state('hdn', style({
        opacity: 0,
        height: 0,
        padding: 0,
        visibility: 'hidden'
      })),
      state('opn', style({
        padding: '*',
        height: '*',
        opacity: 1,
        visibility: 'visible'
      })),
      transition('hdn <=> opn', animate('450ms cubic-bezier(.47,.13,.58,1)'))
    ]),
  ]
})
export class SwsAccordionGroupComponent implements OnInit, OnDestroy, OnChanges {

  @Input() heading: string;
  @Input() sub: string;
  @Input() isOpen: boolean;
  @Input() index: number;
  @Input() leftTitle: string;
  @Input() type: string;
  @Input() colorLeftTitle: string;
  @Output() openEvent: EventEmitter<boolean> = new EventEmitter();

  showAccord = 'hdn';

  constructor(private accordion: SwsAccordionComponent) {
    this.accordion.addGroup(this);
  }

  ngOnInit(): void {
    if (this.isOpen) {
      this.showAccord = 'opn';
    } else {
      this.showAccord = 'hdn';
    }
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        const changedProp = changes[propName];

        if (!changedProp.isFirstChange()) {
          this.accordion.groups[this.index + 1].toggleOpen();
        }
      }
    }
  }

  toggleOpen(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.showAccord = 'opn';
    } else {
      this.showAccord = 'hdn';
    }
    this.openEvent.emit(this.isOpen);
    this.accordion.closeOthers(this);
  }

  ngOnDestroy() {
    this.accordion.removeGroup(this);
  }

}
