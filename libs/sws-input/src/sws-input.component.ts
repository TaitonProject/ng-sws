import {Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'sws-input',
  templateUrl: './sws-input.component.html',
  styleUrls: ['./sws-input.component.css']
})
export class SwsInputComponent implements OnInit, AfterViewInit {

  @Input() formControl: FormControl;
  @Input() id: string = '';
  @Input() valueChangesDelay = 0;
  @Input() readOnly: boolean;
  @Input() label: string = '';
  @Output() emitChangeInput: EventEmitter<any> = new EventEmitter();

  @ViewChild('input') inputElement: ElementRef;

  constructor() {
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.eventInput();
    console.log(this.formControl)
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
}
