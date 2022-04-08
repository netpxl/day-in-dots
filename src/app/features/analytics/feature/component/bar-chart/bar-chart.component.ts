/* eslint-disable */
import { AfterViewInit, Component, ElementRef, HostListener, Input, OnChanges, ViewChild } from '@angular/core';
import { AnalyticsInterface } from '@core/interface/analytics.interface';
import * as d3 from 'd3';


@Component({
  selector: 'did-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements AfterViewInit, OnChanges {
  

  barWidth = 150;
  @Input()
  data: AnalyticsInterface[] = []

  @ViewChild('barChart')
  private chartContainer?: ElementRef;

  @HostListener('window:resize')
  reloadChart() {
    this.createChart();
  }


  margin = { top: 20, right: 20, bottom: 30, left: 40 };

  ngOnChanges() {
    this.createChart();
  }

  ngAfterViewInit() {
    this.createChart();
  }

  private generateSvg(element: any) {
    return d3.select(element).append('svg')
    .attr("viewBox", `0 0 ${element.offsetWidth} ${element.offsetHeight}`);
  }

  private generateAxis(data: AnalyticsInterface[], contentWidth: number, contentHeight: number) {
    const x = d3
    .scaleBand()
    .rangeRound([0, contentWidth])
    .padding(0.1)
    .domain(data.map(d => this.handleNameSubstring(d.name)
    ));

    const y = d3
      .scaleLinear()
      .rangeRound([contentHeight, 0])
      .domain([0, d3.max(data, d => d.slotsUsed)!]);

      return {x, y}
  }

  private createChart(): void {
    d3.select('svg').remove();
    if(!this.chartContainer) {
      return;
    }

    const element = this.chartContainer.nativeElement;
    const data = this.data;

    const svg = this.generateSvg(element)

    const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
    const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;

    const {x, y} = this.generateAxis(data, contentWidth, contentHeight)

    const g = svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + contentHeight + ')')
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(5, '.0f'));

      const bars = g.selectAll('.bar')
      bars
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(this.handleNameSubstring(d.name))!)
      .attr('y', d => y(d.slotsUsed))
      .style('fill', d => d.color)
      .style('fill-opacity', 0.8)
      .attr('width', x.bandwidth())
      .attr('height', d => contentHeight - y(d.slotsUsed));
      
      bars
      .data(data)
      .enter().append('text')
      .text(d => d.slotsUsed)
      .attr('x', (d: AnalyticsInterface) => x(this.handleNameSubstring(d.name))! + (x.bandwidth() / 2) - 7)
      .attr('y', (d: AnalyticsInterface) => y(d.slotsUsed) + ((contentHeight - y(d.slotsUsed)) / 2) + 5);
  }

  private handleNameSubstring(name: string = ''): string {
    let result = name;
    if (name.length > 10) {
      result = name.slice(0, 10) + '...';
    }
    return result;
  }
}
