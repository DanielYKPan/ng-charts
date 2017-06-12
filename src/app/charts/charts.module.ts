/**
 * charts.module
 */

import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsDirective } from './charts.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [ChartsDirective],
    exports: [ChartsDirective],
})
export class ChartsModule {
}
