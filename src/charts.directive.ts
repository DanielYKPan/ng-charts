/**
 * charts.directive
 */

import {
    Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output,
    SimpleChanges
} from '@angular/core';
import { Chart } from 'chart.js';
import { getColors } from './colors';

@Directive({
    selector: 'canvas[ykChart]',
    exportAs: 'yk-chart'
})
export class ChartsDirective implements OnChanges, OnInit, OnDestroy {

    @Input() public chartType: 'line' | 'bar' | 'radar' | 'pie' | 'doughnut' | 'polarArea' | 'bubble' | 'scatter';
    @Input() public chartLabels: string[];
    @Input() public colors: any[];
    @Input() public data: number[] | any[];
    @Input() public datasets: any[];
    @Input() public options: any = {};

    @Output() public chartClick: EventEmitter<any> = new EventEmitter();
    @Output() public chartHover: EventEmitter<any> = new EventEmitter();

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
        if (this.data || this.datasets) {
            this.refresh();
        }
    }

    public ngOnChanges( changes: SimpleChanges ): void {
        if (this.initFlag) {
            if (changes.hasOwnProperty('data') ||
                changes.hasOwnProperty('datasets')) {
                let currentValue = changes['datasets'].currentValue || changes['data'].currentValue;
                this.updateChartData(currentValue);
                this.chart.update();
            } else {
                this.refresh();
            }
        }
    }

    public ngOnDestroy(): any {
        if (this.chart) {
            this.chart.destroy();
            this.chart = void 0;
        }
    }

    /**
     * Generate Chart
     * @param ctx
     * @returns chart
     * */
    public getChartBuilder( ctx: any ): any {
        let datasets: any = this.getDatasets();
        let options: any = Object.assign({}, this.options);

        // hock for onHover and onClick events
        options.hover = options.hover || {};
        if (!options.hover.onHover) {
            options.hover.onHover = ( active: Array<any> ) => {
                if (active && !active.length) {
                    return;
                }
                this.chartHover.emit({active});
            };
        }

        if (!options.onClick) {
            options.onClick = ( event: any, active: Array<any> ) => {
                this.chartClick.emit({event, active});
            };
        }

        let opts = {
            type: this.chartType,
            data: {
                labels: this.chartLabels,
                datasets: datasets
            },
            options: options
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

        if (!this.datasets || !this.datasets.length && (this.data && this.data.length)) {
            if (Array.isArray(this.data[0])) {
                datasets = (this.data as Array<number[]>).map(( data: number[], index: number ) => {
                    return {data, label: this.chartLabels[index] || `Label ${index}`};
                });
            } else {
                datasets = [{data: this.data, label: `Label 0`}];
            }
        }

        console.log(datasets);

        if (this.datasets && this.datasets.length ||
            (datasets && datasets.length)) {
            datasets = (this.datasets || datasets).map(( elm: any, index: number ) => {
                let newElm: any = Object.assign({}, elm);
                if (this.colors && this.colors.length) {
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

    /**
     * Update chart data
     * */
    private updateChartData( newDataValues: any[] ): void {
        if (Array.isArray(newDataValues[0].data)) {
            this.chart.data.datasets.forEach(( dataset: any, i: number ) => {
                dataset.data = newDataValues[i].data;

                if (newDataValues[i].label) {
                    dataset.label = newDataValues[i].label;
                }
            });
        } else {
            this.chart.data.datasets[0].data = newDataValues;
        }
    }
}
