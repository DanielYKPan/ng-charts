/**
 * charts.directive
 */

import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Directive({
    selector: 'canvas[ykChart]',
    exportAs: 'yk-chart'
})
export class ChartsDirective implements OnInit {

    @Input() chartType: 'line' | 'bar' | 'radar' | 'pie' | 'doughnut' | 'polarArea' | 'bubble' | 'scatter';

    private ctx: any;
    private cvs: any;

    constructor( private el: ElementRef ) {
    }

    public ngOnInit(): void {
        this.ctx = this.el.nativeElement.getContext('2d');
        this.cvs = this.el.nativeElement;

        new Chart(this.ctx, {
            type: this.chartType,
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
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
        });
    }
}
