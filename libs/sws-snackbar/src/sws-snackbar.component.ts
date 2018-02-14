import {Component, Input, OnInit} from '@angular/core';
import {ISnackbar} from './interfaces/snack';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {filter} from "rxjs/operators";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'sws-snackbar',
  templateUrl: './sws-snackbar.component.html',
  styleUrls: ['./sws-snackbar.component.scss']
})
export class SwsSnackbarComponent implements OnInit {

  snackbarOptions: ISnackbar;
  showSnackbar = false;

  @Input() errorObs: BehaviorSubject<any>;
  @Input() successObs: BehaviorSubject<any>;

  constructor() {
  }

  ngOnInit() {
    /*Observable.merge(this.errorObs, this.successObs).subscribe(res => {
      console.log(res);
      this.showSnackbar = true;
      this.snackbarOptions = {
        message: res,
        eType: true
      };
      setTimeout(() => {
        this.showSnackbar = false;
      }, 2000);
    });*/

    /*Observable.combineLatest(this.errorObs, this.successObs).pipe(filter(res => res[0] != null || res[1] !== null)).subscribe(messageType => {
      if (messageType[0]) {
        this.showSnackbar = true;
        this.snackbarOptions = {
          message: messageType[0],
          eType: true
        };
        setTimeout(() => {
          this.showSnackbar = false;
        }, 2000);
      } else if (messageType[1]) {
        this.showSnackbar = true;
        this.snackbarOptions = {
          message: messageType[1],
          sType: true
        };
        setTimeout(() => {
          this.showSnackbar = false;
        }, 2000);
      }
    });*/


    this.errorObs.pipe(filter(res => res)).subscribe( (data) => {
        console.log(data);
        this.showSnackbar = true;
        this.snackbarOptions = {
          message: data,
          eType: true
        };
        setTimeout(() => {
          this.showSnackbar = false;
        }, 2000);
    });
    this.successObs.pipe(filter(res => res)).subscribe( (data) => {
        console.log(data);
        this.showSnackbar = true;
        this.snackbarOptions = {
          message: data,
          sType: true
        };
        setTimeout(() => {
          this.showSnackbar = false;
        }, 2000);
    });
  }

  removeSnackbar() {
    this.showSnackbar = false;
  }

}
