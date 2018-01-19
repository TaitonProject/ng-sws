import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  title = 'app';
  form: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      org: new FormControl(),
      date: new FormControl()
    });
    this.form.controls['org'].patchValue('123123');
    this.form.controls['date'].patchValue('1980-12-01');
    this.form.controls['date'].setValidators([Validators.required]);
    this.form.controls['org'].setValidators([Validators.required]);
    this.form.valueChanges.subscribe((res) => {
      console.log(res)
    })
  }
}
