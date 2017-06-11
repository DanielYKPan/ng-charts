/**
 * charts.directive
 */

import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';

@Directive({
    selector: 'canvas[ykChart]',
    exportAs: 'yk-chart'
})
export class ChartsDirective implements OnChanges, OnInit {

    @Input() chartType: 'line' | 'bar' | 'radar' | 'pie' | 'doughnut' | 'polarArea' | 'bubble' | 'scatter';
    @Input() chartLabels: string[];

    private chart: any;
    private ctx: any;
    private cvs: any;
    private initFlag:boolean = false;

    constructor( private el: ElementRef ) {
    }

    public ngOnInit(): void {
        this.ctx = this.el.nativeElement.getContext('2d');
        this.cvs = this.el.nativeElement;
        this.initFlag = true;
        this.refresh();
    }

    public ngOnChanges( changes: SimpleChanges ): void {
    }

    public getChartBuilder(ctx: any): any {
        let opts = {
            type: this.chartType,
            data: {
                labels: this.chartLabels,
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {}
        };
        return new Chart(ctx, opts);
    }

    private refresh(): void {
        this.chart = this.getChartBuilder(this.ctx);
    }
}
