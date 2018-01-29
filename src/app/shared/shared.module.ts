import { TwainComponent } from './twain/twain.component';
import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }   from '@angular/forms';

// import { HighlightDirective } from './highlight.directive';
// import { TitleCasePipe }      from './title-case.pipe';

@NgModule({
  imports:      [ CommonModule ],
  exports:      [ CommonModule, FormsModule,
                  // HighlightDirective, TitleCasePipe, TwainComponent ],
                  TwainComponent ],
  // declarations: [ HighlightDirective, TitleCasePipe, TwainComponent ]
  declarations: [TwainComponent]

})
export class SharedModule { }

