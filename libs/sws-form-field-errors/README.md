# sws-form-field-errors
sws-form-field-errors module to work in Angular 5
### To install simply run
npm install sws-form-field-errors.
***
To use it in your Angular 5 app import the module.
import {SwsFormFieldErrorsModule} from 'sws-form-field-errors';
```
import {SwsFormFieldErrorsModule} from 'sws-form-field-errors';
...
@NgModule({
imports:[SwsFormFieldErrorsModule],
})  
``` 
In your components in html template input 
```
<sws-field-errors>error</sws-field-errors>
```
Example:
```
<sws-field-errors *ngIf="form.controls['name'].hasError('required')">your error</sws-field-errors>
```