export interface DatepickerOptions {
  minYear?: number; // default: current year - 80
  maxYear?: number; // default: current year - 14
  displayFormat?: string; // default: 'DD.MM.YYYY'
  barTitleFormat?: string; // default: 'MMMM YYYY'
  barTitleIfEmpty?: string;
  firstCalendarDay?: number; // 0 = Sunday (default), 1 = Monday, ..
  locale?: object;
  minDate?: Date;
  maxDate?: Date;
  startDate?: Date;
}