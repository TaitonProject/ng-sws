import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {ISnackbar} from './interfaces/snack';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'sws-snackbar',
  templateUrl: './sws-snackbar.component.html',
  styleUrls: ['./sws-snackbar.component.scss']
})
export class SwsSnackbarComponent implements OnInit {

  @Input() errorObs: BehaviorSubject<any>;
  @Input() successObs: BehaviorSubject<any>;
  @Input() snackbarOptions: any;

  constructor() {}

  ngOnInit() {
/*    this.errorObs.subscribe( (data) => {
      console.log('error');
    });
    this.successObs.subscribe( (data) => {
      console.log('success');
    });*/
  }

  removeSnackbar() {
    this.snackbarOptions = null;
  }

}
