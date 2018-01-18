# sws-datepicker
sws-datepicker module to work in Angular 5
### To install simply run
npm install sws-datepicker.
**Also you need install**
1. npm i sws-label-directive
2. npm install date-fns
***
After that you need import style to your style.css file for style label
```
@import "../node_modules/sws-label-directive/label.css";
```
To use it in your Angular 5 app import the module.
import {SwsDatepickerModule} from 'sws-datepicker';
```
import {SwsDatepickerModule} from 'sws-datepicker';
...
@NgModule({
imports:[
SwsDatepickerModule
],
})  
``` 
In your components in html template input 
```
<sws-datepicker></sws-datepicker>
```
**Important**
Also you need sent to sws-datepicker parameter as formControl
```
<sws-datepicker [control]="form.controls['name']"></sws-datepicker>
```

If may sent any parameters 'label, id, readOnly, valueChangesDelay, position'. Example:
```
<sws-datepicker [control]="form.controls['name']" [label]="'Your name'" [id]="'name'" [readOnly]="true"></sws-datepicker>
``` 
###Additional attributes
| name      | type    | default | description |
| ----------|:-------:| -----:|-----:|
| headless  | boolean | false |Disable datepicker's input|
| isOpened	| boolean | false |Show or hide datepicker|
| position  | string  | top-right |Dropdown position **(bottom-left, bottom-right, top-left, top-right)**|

###Options
***
```
import { DatepickerOptions } from 'sws-datepicker/interfaces/DatepickerOptions';
import * as ruLocale from 'date-fns/locale/ru';
 
options: DatepickerOptions = {
  minYear: 1970,
  maxYear: 2030,
  displayFormat: 'DD MM YYYY',
  barTitleFormat: 'MMMM YYYY',
  firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
  locale: ruLocale,
  minDate: new Date(Date.now()), // Minimal selectable date
  maxDate: new Date(Date.now()),  // Maximal selectable date
  barTitleIfEmpty: 'Click to select a date'
};
``` 