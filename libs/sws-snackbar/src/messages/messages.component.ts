import {Component, Input, OnInit} from '@angular/core';
import {ISnackbar} from "../interfaces/snack";

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  @Input() snackbarOptions: ISnackbar;

  constructor() { }

  ngOnInit() {}

}
