# tooltip
sws-hint module to work in Angular 5
### To install simply run
npm install sws-hint.
To use it in your Angular 5 app import the module.
import {SWSTooltipModule} from 'sws-hint';
```@NgModule({
imports:[
SWSTooltipModule
],
})  
``` 
In your components html input in html tag sws-tooltip="test". Default position in right. Also may be put position in left - sws-tooltip-pos="left"
###Important! Input to our css file style for tooltip
```
@import "../node_modules/sws-hint/sws-tooltip.css";
``` 