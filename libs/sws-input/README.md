# sws-input
sws-input module to work in Angular 5
### To install simply run
npm install sws-input.
**Also you need install**
1. npm i sws-label-directive
***
After that you need import style to your style.css file for style label
```
@import "../node_modules/sws-label-directive/label.css";
```
To use it in your Angular 5 app import the module.
import {SwsInputModule} from 'sws-input';
```
import {SwsInputModule} from 'sws-input';
...
@NgModule({
imports:[
SwsInputModule
],
})  
``` 
In your components in html template input 
```
<sws-input></sws-input>
```
**Important**
Also you need sent to sws-datepicker parameter as formControl
```
<sws-input [control]="form.controls['name']"></sws-input>
```

If may sent any parameters 'label, id, maxLength' or input any errors. Example:
```
<sws-input [control]="form.controls['name']" [label]="'Your name'" [maxLength]="10" [id]="'name'">
<span *ngIf="form.controls['name'].hasError('required')">error</span>
</sws-input>
```