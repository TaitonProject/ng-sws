import { Component, OnInit, EventEmitter, Output, Input, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { IModalOptions } from '../../../../core/interfaces/modal-content';

@Component({
  selector: 'sws-modal',
  templateUrl: './sws-modal.component.html',
  styleUrls: ['./sws-modal.component.scss']
})
export class SWSModalComponent implements OnInit, AfterViewInit {

  title: string = ''; // заголовок
  width: string = '900px'; // ширина
  mLeft: string = '-450px'; // margin-left
  mHeight: string = '-80px'; // margin-top
  dataModal: any;
  @ViewChild('modalInner') modalInner: ElementRef; // идентификатор для вычисления высоты блока
  @Output() onModalClose: EventEmitter<any> = new EventEmitter<any>(); // действие при отрицательном ответе
  @Output() onModalApply: EventEmitter<any> = new EventEmitter<any>(); // действие при положительном ответе
  @Input() options: IModalOptions; // получение параметров

  constructor() { }

  ngOnInit() {
    if (this.options.title)
      this.title = this.options.title;
    if (this.options.width) {
      this.width = this.options.width + 'px';
      this.onCenterWindowH(this.options.width);
    }
    if (this.options.dataModal != null)
      this.dataModal = this.options.dataModal; // присваиваем данные, переданные в модальку
  }

  ngAfterViewInit() {
    this.onCenterWindowV(); //центрирование модальки по вертикали
  }

  onCenterWindowH(width: string) {
    this.mLeft = '-' + (+width / 2) + 'px'; //центрирование модальки по горизонтали
  }

  onCenterWindowV() {
    this.mHeight = '-' + (this.modalInner.nativeElement.offsetHeight / 2) + 'px';
  }
}
