# hint/tooltip
sws-hint module to work in Angular 5
### To install simply run
npm install sws-hint.
To use it in your Angular 5 app import the module.
import {SWSHintModule} from 'sws-hint';
```@NgModule({
imports:[
SWSHintModule
],
})  
``` 
In your components html input in html tag sws-hint="test". Default position in right. Also may be put position in left, top, bottom. Example: - sws-hint-pos="left"
###Important! Input to our css file style for hint
```
@import "../node_modules/sws-hint/sws-hint.css";
``` 