/**
 * charts.directive
 */

import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';
import { getColors } from './colors';

@Directive({
    selector: 'canvas[ykChart]',
    exportAs: 'yk-chart'
})
export class ChartsDirective implements OnChanges, OnInit {

    @Input() public chartType: 'line' | 'bar' | 'radar' | 'pie' | 'doughnut' | 'polarArea' | 'bubble' | 'scatter';
    @Input() public chartLabels: string[];
    @Input() public colors: any[];
    @Input() public datasets: any[];

    private chart: any;
    private ctx: any;
    private cvs: any;
    private initFlag: boolean = false;

    constructor( private el: ElementRef ) {
    }

    public ngOnInit(): void {
        this.ctx = this.el.nativeElement.getContext('2d');
        this.cvs = this.el.nativeElement;
        this.initFlag = true;
        if (this.datasets) {
            this.refresh();
        }
    }

    public ngOnChanges( changes: SimpleChanges ): void {
    }

    /**
     * Generate Chart
     * @param ctx
     * @returns chart
     * */
    public getChartBuilder( ctx: any ): any {
        let datasets: any = this.getDatasets();
        let opts = {
            type: this.chartType,
            data: {
                labels: this.chartLabels,
                datasets: datasets
            },
            options: {}
        };
        return new Chart(ctx, opts);
    }

    /**
     * Refresh the chart
     * */
    private refresh(): void {
        this.chart = this.getChartBuilder(this.ctx);
    }

    /**
     * Get a chart datasets
     * @returns object
     * */
    private getDatasets(): any {
        let datasets: any = void 0;

        if (this.datasets && this.datasets.length) {
            datasets = this.datasets.map(( elm: any, index: number ) => {
                let newElm: any = Object.assign({}, elm);
                if (this.colors) {
                    Object.assign(newElm, this.colors[index]);
                } else {
                    Object.assign(newElm, getColors(this.chartType, index, newElm.data.length));
                }
                return newElm;
            });
        }

        if (!datasets) {
            throw new Error(`ng-charts configuration error,
      data or datasets field are required to render char ${this.chartType}`);
        }

        return datasets;
    }
}
