/**
 * app.module
 */

import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';

import { ChartsModule } from './charts/charts.module';

import '../sass/main.scss';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ChartsModule,
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

