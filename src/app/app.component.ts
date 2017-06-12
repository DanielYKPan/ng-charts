/**
 * app.component
 */

import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'yk-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

    public chartType = 'bar';
    public chartLabels: Array<any> = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"];

    public chartData: Array<any> = [12, 19, 3, 5, 2, 3];

    public chartColors: Array<any> = [
        {
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
            ]
        },
    ];

    public chartOptions: any = {
        title: {
            display: true,
            text: 'Custom Chart Title'
        }
    };

    constructor() {
    }

    ngOnInit(): void {
    }

    public randomize():void {
        let _lineChartData:Array<any> = new Array(this.chartData.length);
        for (let i = 0; i < this.chartData.length; i++) {
            _lineChartData[i] = {data: new Array(this.chartData[i].data.length), label: this.chartData[i].label};
            for (let j = 0; j < this.chartData[i].data.length; j++) {
                _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
            }
        }
        this.chartData = _lineChartData;
    }

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }
}
