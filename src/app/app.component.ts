import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  title = 'app';

  form: FormGroup;

  constructor() {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl()
    });
    this.form.controls['name'].patchValue('123123');
  }
}
