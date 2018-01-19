# sws-label-directive
sws-label-directive directive work in Angular 5
### To install simply run
npm install sws-label-directive.
***
After that you need import style to your style.css file for style label
```
@import "../node_modules/sws-label-directive/label.css";
```
To use it in your Angular 5 app import the module.
import {SwsLabelDirectiveModule} from 'sws-label-directive';
```
import {SwsLabelDirectiveModule} from 'sws-label-directive';
...
@NgModule({
imports:[
SwsLabelDirectiveModule
],
})  
``` 
In your components in html template input 
```
<div>
<input [swsLabel]="label" 
       [id]="id">
</div>
```
