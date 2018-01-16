import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "@ngx-translate/core";
import { SWSModalComponent } from './sws-modal.component';
import { MatButtonModule } from "@angular/material";
import { TitleModalComponent } from './title-modal/title-modal.component';

@NgModule({
  imports: [CommonModule, TranslateModule, MatButtonModule],
  exports: [SWSModalComponent],
  declarations: [SWSModalComponent, TitleModalComponent]
})
export class SWSModalModule { }
