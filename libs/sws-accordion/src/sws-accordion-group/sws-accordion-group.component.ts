import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SwsAccordionComponent } from '../sws-accordion.component';

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
export class SwsAccordionGroupComponent implements OnInit, OnDestroy {

  @Input() heading: string;
  @Input() sub: string;
  @Input() isOpen: boolean = false; // открытие вкладки по умолчанию
  @Input() index: number; // для индексов
  @Input() leftTitle: string;
  @Input() type: string;
  @Input() colorLeftTitle: string;
  @Input() hasError: boolean = false; // получаем ошибки
  @Output() openEvent: EventEmitter<boolean> = new EventEmitter(); //emit при открытии
  @Output() hasErrorOutput: EventEmitter<boolean> = new EventEmitter(); //emit при ошибке

  showAccord = 'hdn'; // css класс для скрытия
  hasErrorOut: boolean; //переменная для добавления значения из sws-accordion.component
  click: boolean; //смотрим был ли открыт аккордион

  constructor(private accordion: SwsAccordionComponent) {
    this.accordion.addGroup(this);
  }

  ngOnInit(): void {
    if (this.isOpen) {
      this.showAccord = 'opn'
      const index = this.accordion.groups.findIndex(acc => acc.isOpen == true);
      this.accordion.openIndex = index !== -1 ? index : this.accordion.openIndex;
    } else {
      this.showAccord = 'hdn';
    }
  }

  toggleOpen(): void {
    const index = this.accordion.groups.findIndex(acc => acc.isOpen == true);
    this.accordion.openIndex = index !== -1 ? index : this.accordion.openIndex; //находим индекс элемента в массиве
    if (this.accordion.groups[this.accordion.openIndex]) { // если есть какая-то открытая вкладка
      this.accordion.groups[this.accordion.openIndex].click = true; //добавляем клик по аккордиону
      if (this.accordion.groups[this.accordion.openIndex].hasError && this.accordion.groups[this.accordion.openIndex].isOpen) { // если есть ошибка и был открыт, кидаем event
        this.accordion.groups[this.accordion.openIndex].hasErrorOutput.emit(true); // кидаем event
      }
    }
    this.isOpen = !this.isOpen; //закрываем вкладку
    if (this.isOpen) {
      this.showAccord = 'opn'; // добавляем соответствующие классы
    } else {
      this.showAccord = 'hdn';  // добавляем соответствующие классы
    }
    this.accordion.closeOthers(this); // пробегаем по массиву им закрываем все вкладки
    this.openEvent.emit(this.isOpen); // кидаем event при открытии вкладки
  }

  ngOnDestroy() {
    this.accordion.removeGroup(this);
  }

}
