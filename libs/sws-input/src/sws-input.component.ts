import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'sws-input',
  templateUrl: './sws-input.component.html',
  styleUrls: ['./sws-input.component.css']
})
export class SwsInputComponent implements OnInit, AfterViewInit {

  @Input('control') formControl: FormControl;
  @Input() id = '';
  @Input() valueChangesDelay = 0;
  @Input() readOnly: boolean;
  @Input() label = '';
  @Output() emitChangeInput = new EventEmitter<any>();
  @ViewChild('input') inputElement: ElementRef;

  constructor() { }

  ngOnInit() {
    this.hasControl();
  }

  ngAfterViewInit(): void {
    this.eventInput();
  }

  eventInput() {
    const eventStream = Observable.fromEvent(this.inputElement.nativeElement, 'input')
      .map(val => val['target'].value)
      .debounceTime(this.valueChangesDelay);

    eventStream.subscribe(value => {
      this.emitChangeInput.emit(value);
      this.formControl.patchValue(value);
    });
  }

  keyup(ev: any) {
    this.formControl.patchValue(ev.target.value);
  }

  private hasControl() {
    if (this.formControl == null) {
        console.error("Your formControl is null! Please check your input to component");
    }
  }

}
