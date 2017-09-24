import { D3Service } from 'd3-ng2-service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MyComponent } from './my-component/my/my.component';
import { ChartComponent } from './d3-charts/chart/chart.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdInputModule, MdButtonModule, MdSelectModule, MdIconModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    MyComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    BrowserAnimationsModule,
    MdInputModule,
    MdButtonModule,
    MdSelectModule,
    MdIconModule
  ],
  providers: [D3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
