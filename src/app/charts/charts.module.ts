/**
 * charts.module
 */

import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsDirective } from './charts.directive';
import { BaseChartDirective } from './base.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [ChartsDirective, BaseChartDirective],
    exports: [ChartsDirective, BaseChartDirective],
})
export class ChartsModule {
}
