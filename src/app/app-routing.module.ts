import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'test'},
  {path: 'sections', loadChildren: './sections/sections.module#SectionsModule'},
  {path: 'test', loadChildren: './test/test.module#TestModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
