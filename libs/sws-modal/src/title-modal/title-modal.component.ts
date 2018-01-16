import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'title-modal',
  templateUrl: './title-modal.component.html',
  styleUrls: ['./title-modal.component.scss']
})
export class TitleModalComponent implements OnInit {

  @Output() onModalClose = new EventEmitter<any>();
  @Input() title: string;
  constructor() { }

  ngOnInit() {
  }

}
