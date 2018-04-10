import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// import { HighlightDirective } from './highlight.directive';
// import { TitleCasePipe }      from './title-case.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  // declarations: [ HighlightDirective, TitleCasePipe, ]
  declarations: [

  ],
  exports: [
    CommonModule,
    FormsModule,
    // HighlightDirective, TitleCasePipe ],

  ],

})
export class SharedModule { }

