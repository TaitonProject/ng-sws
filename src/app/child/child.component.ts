import {
  Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit, OnChanges, OnDestroy {

  @Input() data: string;
  @Output() eventString: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChangers', changes);
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy ChildComponent', this.data);
  }
}
