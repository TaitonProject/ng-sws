import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit, ElementRef, HostListener, forwardRef, ViewChild, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import {
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  setYear,
  eachDay,
  getDate,
  getMonth,
  getYear,
  isToday,
  isSameDay,
  isSameMonth,
  isSameYear,
  format,
  getDay,
  subDays,
  setDay,
  parse,
  isValid
} from 'date-fns';
import * as ruLocale from 'date-fns/locale/ru';
import { DatepickerOptions } from './interfaces/DatepickerOptions';

/**
 * Internal library helper that helps to check if value is empty
 * @param value
 */
const isNil = (value: Date | DatepickerOptions) => {
  return (typeof value === 'undefined') || (value === null);
};

@Component({
  selector: 'sws-datepicker',
  templateUrl: 'sws-datepicker.component.html',
  styleUrls: ['sws-datepicker.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SwsDatepickerComponent), multi: true }
  ]
})
export class SwsDatepickerComponent implements ControlValueAccessor, OnInit, OnChanges, AfterViewInit {
  @Input() options: DatepickerOptions;

  /**
   * Disable datepicker's input
   */
  @Input() headless = false;

  /**
   * Set datepicker's visibility state
   */
  @Input() isOpened = false;

  /**
   * Datepicker dropdown position
   */
  @Input() position = 'top-right';

  /**
   * Parametors, whitch we are sent to this component
   */
  @Input('control') formControl: FormControl;
  @Input() id: string = '';
  @Input() valueChangesDelay = 0;
  @Input() readOnly: boolean;
  @Input() label: string = '';
  @ViewChild('input') inputElement: ElementRef;

  private positions = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];

  innerValue: Date;
  displayFormat: string;
  date: Date;
  barTitle: string;
  barTitleFormat: string;
  barTitleIfEmpty: string;
  minYear: number;
  maxYear: number;
  firstCalendarDay: number;
  view: string;
  years: { year: number; isThisYear: boolean }[];
  dayNames: string[];
  days: {
    date: Date;
    day: number;
    month: number;
    year: number;
    inThisMonth: boolean;
    isToday: boolean;
    isSelected: boolean;
    isSelectable: boolean;
  }[];
  locale: object;
  startDate: Date = new Date(1980, 0, 1);
  isValue: boolean = false;
  parent;
  isError: boolean = false;

  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: any) => void = () => { };

  get value(): Date {
    return this.innerValue;
  }

  set value(val: Date) {
    this.innerValue = val;
    this.onChangeCallback(this.innerValue);
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit() {
    this.hasControl();
    this.view = 'days';
    this.date = this.startDate;
    this.setOptions();
    this.initDayNames();
    this.initYears();
    // Check if 'position' property is correct
    if (this.positions.indexOf(this.position) === -1) {
      throw new TypeError(`sws-datepicker: неверное значение для значения позиционирования '${this.position}' (expected: ${this.positions.join(', ')})`);
    }
  }

  ngAfterViewInit() {
    this.parent = this.elementRef.nativeElement.querySelector('.sws-form-input').parentNode;
     //if we sent control not empty
     if (this.formControl.value) {
      this.date = parse(this.formControl.value);
      this.isValue = true;
    }
    this.innerValue = this.date;
    this.init();
    //if we sent control empty
    if (!this.isValue) {
      this.formControl.patchValue('');
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if ('options' in changes) {
      this.setOptions();
      this.initDayNames();
      this.init();
      this.initYears();
    }
  }

  setOptions(): void {
    const today = new Date(); // this const was added because during my tests, I noticed that at this level this.date is undefined
    this.minYear = this.options && this.options.minYear || getYear(today) - 80;
    this.maxYear = this.options && this.options.maxYear || getYear(today) - 14;
    this.displayFormat = this.options && this.options.displayFormat || 'DD.MM.YYYY';
    this.barTitleFormat = this.options && this.options.barTitleFormat || 'MMMM YYYY';
    this.barTitleIfEmpty = this.options && this.options.barTitleIfEmpty || 'Кликните, чтобы выбрать дату';
    this.firstCalendarDay = this.options && this.options.firstCalendarDay || 1;
    this.locale = this.options && { locale: this.options.locale } || { locale: ruLocale };
  }

  nextMonth(): void {
    this.date = addMonths(this.date, 1);
    this.init();
  }

  prevMonth(): void {
    this.date = subMonths(this.date, 1);
    this.init();
  }

  setDate(i: number): void {
    this.date = this.days[i].date;
    this.value = this.date;
    this.init();
    this.close();
  }

  setYear(i: number): void {
    this.date = setYear(this.date, this.years[i].year);
    this.init();
    this.initYears();
    this.view = 'days';
  }

  /**
   * Checks if specified date is in range of min and max dates
   * @param date
   */
  private isDateSelectable(date: Date): boolean {
    if (isNil(this.options)) {
      return true;
    }

    const minDateSet = !isNil(this.options.minDate);
    const maxDateSet = !isNil(this.options.maxDate);
    const timestamp = date.valueOf();

    if (minDateSet && (timestamp < this.options.minDate.valueOf())) {
      return false;
    }

    if (maxDateSet && (timestamp > this.options.maxDate.valueOf())) {
      return false;
    }

    return true;
  }

  init(): void {
    const start = startOfMonth(this.date);
    const end = endOfMonth(this.date);

    this.days = eachDay(start, end).map(date => {
      return {
        date: date,
        day: getDate(date),
        month: getMonth(date),
        year: getYear(date),
        inThisMonth: true,
        isToday: isToday(date),
        isSelected: isSameDay(date, this.innerValue) && isSameMonth(date, this.innerValue) && isSameYear(date, this.innerValue),
        isSelectable: this.isDateSelectable(date)
      };
    });

    for (let i = 1; i <= getDay(start) - this.firstCalendarDay; i++) {
      const date = subDays(start, i);
      this.days.unshift({
        date: date,
        day: getDate(date),
        month: getMonth(date),
        year: getYear(date),
        inThisMonth: false,
        isToday: isToday(date),
        isSelected: isSameDay(date, this.innerValue) && isSameMonth(date, this.innerValue) && isSameYear(date, this.innerValue),
        isSelectable: this.isDateSelectable(date)
      });
    }

    //this.displayValue = this.innerValue ? format(this.innerValue, this.displayFormat, this.locale) : '';
    this.barTitle = this.innerValue ? format(start, this.barTitleFormat, this.locale) : this.barTitleIfEmpty;
    if (this.formControl.value == format(this.innerValue, this.displayFormat, this.locale)) {
      return;
    }
    this.formControl.patchValue(format(this.innerValue, this.displayFormat, this.locale))
  }

  initYears(): void {
    const range = this.maxYear - this.minYear;
    this.years = Array.from(new Array(range), (x, i) => i + this.minYear).map(year => {
      return { year: year, isThisYear: year === getYear(this.date) };
    });
  }

  initDayNames(): void {
    this.dayNames = [];
    const start = this.firstCalendarDay;
    for (let i = start; i <= 6 + start; i++) {
      const date = setDay(new Date(), i);
      this.dayNames.push(format(date, 'ddd', this.locale));
    }
  }

  toggleView(): void {
    this.view = this.view === 'days' ? 'years' : 'days';
  }

  toggle(): void {
    this.isOpened = !this.isOpened;
  }

  close(): void {
    this.isOpened = false;
  }

  writeValue(val: Date) {
    if (val) {
      this.date = val;
      this.innerValue = val;
      this.init();
      this.barTitle = format(startOfMonth(val), this.barTitleFormat, this.locale);
    }
  }

  changeValue(val: string) {
    if (~val.indexOf("-")) {
      val = val.replace(/-/g, ".");
    }
    if (~val.indexOf("/")) {
      val.replace(/\//g, ".");
    }
    let parts = val.split('.');
    let dateString = parts[2] + '-' + parts[1] + '-' + parts[0];
    let date = parse(dateString);
    if (!isValid(date)) {
      if (this.formControl.value) {
        this.formControl.patchValue(format(this.innerValue, this.displayFormat, this.locale));
      }
      return;
    }
    this.writeValue(date);
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  private hasControl() {
    if (this.formControl == null) {
      console.error("Your formControl is null! Please check your input to component");
    }
  }

  addClassToParent(cl: string) {
    this.renderer.addClass(this.parent, cl);
  }

  @HostListener('document:click', ['$event']) onBlur(e: MouseEvent) {
    if (!this.isOpened) {
      return;
    }

    const button = this.elementRef.nativeElement.querySelector('.sws-datepicker-button');

    if (button == null) {
      return;
    }

    if (e.target === button || button.contains(<any>e.target)) {
      this.addClassToParent('active-lbl');
      return;
    }

    const container = this.elementRef.nativeElement.querySelector('.sws-datepicker-calendar-container');
    if (container && container !== e.target && !container.contains(<any>e.target) && !(<any>e.target).classList.contains('year-unit')) {
      this.isError = true;
      this.close();
    }
  }
}
