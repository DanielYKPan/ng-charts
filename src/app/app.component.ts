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

    public chartType = 'line';
    public chartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    public chartData:Array<any> = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
        {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
    ];

    constructor() {
    }

    ngOnInit(): void {
    }
}
