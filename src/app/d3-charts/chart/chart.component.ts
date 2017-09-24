
import { Component, OnInit, ElementRef } from '@angular/core';
import { D3, Selection, D3Service } from 'd3-ng2-service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  private d3: D3;
  private parentNativeElement: any;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>;

  private d3ParentElement: any;
  private svg: any;
  private xVal: number;
  private yVal: number;
  private data: { xVal: number, yVal: number }[] = [];
  private padding: number = 25;
  private width: number = 500;
  private height: number = 150;
  private xScale: any;
  private yScale: any;
  private xAxis: any;
  private yAxis: any;

  private buildChard() {

    this.svg = this.d3.select(this.parentNativeElement)
      .append('svg')      // create an <svg> element
      .attr('width', this.width) // set its dimensions
      .attr('height', this.height);

    this.xScale = this.d3.scaleLinear()
      .domain([0, this.d3.max(this.data, function (d) { return d.xVal; })])
      .range([0, 200]);

    this.yScale = this.d3.scaleLinear()
      .domain([0, this.d3.max(this.data, function (d) { return d.yVal; })])
      .range([100, 0]);

    this.xAxis = (<any>this.d3).axisBottom(this.xScale) // d3 v.4
      .ticks(5)
      .scale(this.xScale);

    this.yAxis = (<any>this.d3).axisLeft(this.yScale)
      .scale(this.yScale)
      .ticks(7);

    this.svg.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(' + (this.padding) + ',' + this.padding + ')')
      .call(this.yAxis);

    this.svg.append('g')            // create a <g> element
      .attr('class', 'axis')   // specify classes
      .attr('transform', 'translate(' + this.padding + ',' + (this.height - this.padding) + ')')
      .call(this.xAxis);            // let the axis do its thing

    const rects: any = this.svg.selectAll('rect')
      .data(this.data);
    rects.size();

    const newRects: any = rects.enter();

    newRects.append('rect')
      .attr('x', (d, i) => {
        return this.xScale(d.xVal);
      })
      .attr('y', (d, i) => {
        return this.yScale(d.yVal);
      })
      .attr('transform', 'translate(' + (this.padding - 5) + ',' + (this.padding - 5) + ')')
      .attr('height', 10)
      .attr('width', 10);


  }

  constructor(private elementRef: ElementRef, private d3Service: D3Service) {
    this.d3 = this.d3Service.getD3();
    this.data = [
      { xVal: 1, yVal: 10 },
      { xVal: 2, yVal: 40 },
      { xVal: 3, yVal: 20 },
      { xVal: 4, yVal: 30 }
    ];
  }

  ngOnInit() {
    this.parentNativeElement = this.elementRef.nativeElement;
    if (this.parentNativeElement) {
      this.buildChard();
    }
  }

}
