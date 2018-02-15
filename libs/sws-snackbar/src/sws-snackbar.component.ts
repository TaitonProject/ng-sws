import { Component, Input, EventEmitter, ViewEncapsulation, } from '@angular/core';

@Component({
  selector: 'sws-snackbar',
  templateUrl: './sws-snackbar.component.html',
  styleUrls: ['./sws-snackbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SwsSnackbarComponent {

  @Input() type: string;
  @Input() message: string;
  close: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  closeSnackbar() {
    this.close.emit();
  }
}
