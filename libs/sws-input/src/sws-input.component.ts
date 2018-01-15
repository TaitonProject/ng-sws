import {Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'sws-input',
  templateUrl: './sws-input.component.html',
  styleUrls: ['./sws-input.component.css']
})
export class SwsInputComponent implements OnInit, AfterViewInit {

  @Input() value: any;
  @Input() controlKey: FormControl;
  @Input() emitEvent = true;
  @Input() valueChangesDelay = 1000;
  @Input() typeInput = 'number';
  @Input() textColor: string;
  @Input() placeholder = '';
  @ViewChild('inputAny') inputAny: ElementRef;
  @ViewChild('inputNumber') inputNumber: ElementRef;
  @Output() emitChangeInput: EventEmitter<any> = new EventEmitter();
  inputElement: ElementRef;

  constructor() {
  }

  ngOnInit() {
    if (!this.value || this.value === '') {
      this.value = this.controlKey.value;
    }
    this.controlKey.valueChanges.subscribe(res => {
      this.value = res;
    });
  }

  ngAfterViewInit(): void {
    this.setTypeInput();
    this.eventInput();
  }

  setTypeInput() {
    if (this.typeInput === 'number') {
      this.inputElement = this.inputNumber;
    } else {
      this.inputElement = this.inputAny;
    }
  }

  eventInput() {
    const eventStream = Observable.fromEvent(this.inputElement.nativeElement, 'input')
      .map(val => val['target'].value)
      .debounceTime(this.valueChangesDelay);

    eventStream.subscribe(value => {
      if (value === '') {
        value = null;
      }
      this.emitChangeInput.emit(value);
      this.controlKey.patchValue(value, {emitEvent: this.emitEvent});
    });
  }
}
