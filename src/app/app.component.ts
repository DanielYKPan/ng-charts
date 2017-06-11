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
    public chartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    constructor() {
    }

    ngOnInit(): void {
    }
}
