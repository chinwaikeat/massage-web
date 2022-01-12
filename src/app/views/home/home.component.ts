import { Component, OnInit } from '@angular/core';
import {Chart } from 'angular-highcharts';
import { donutChartOptions} from '../../utils/donutChartOptions'
import { areaChartOptions} from '../../utils/areaChartOptions'
import { barChart} from '../../utils/barChart'
//import { oneLineBar} from '../../utils/oneLineBar'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 
  // chart = new Chart(donutChartOptions);
  areaSplineChart = new Chart(areaChartOptions);
  barChart = new Chart(barChart);
  oneLineBar :any;
  highchart : any
  constructor() {

  
    
  }

  ngOnInit(): void {
   
    var exampleData:any[] =[
      {
        description: 'Duration: 5 <br/>Strength: 40',
        data: [{ 
          y: 5,
      }],
      },
      {
        description: 'Duration: 2 <br/>Strength: 40',
        data: [{
          y: 2,
      }],
      },
      {
        description: 'Duration: 3 <br/>Strength: 40',
        data: [{
          y: 3,
      }],
      },
      {
        description: 'Duration: 4 <br/>Strength: 40',
        data: [{
          y: 4,
      }],
      },
      {
        description: 'Duration: 1 <br/>Strength: 40',
        data: [{
          y: 1,
      }],
      },
      {
        description: 'Duration: 6 <br/>Strength: 40',
        data: [{
          y: 6,
         
      }],
      },
      {
        description: 'Duration: 6 <br/>Strength: 40',
        data: [{
          y: 4,  
      }],
      },
      {
        description: 'Duration: 5 <br/>Strength: 40',
        data: [{
          y: 5,
      }],
      },
    ];


    this.oneLineBar = new Chart({
      chart: {
        type: 'bar',
        height: 200,
      },
      title: {
        text: 'Time allocate for massage',
      },
      subtitle: {
        text: 'Source: WorldClimate.com',
      },
      xAxis: {
        visible: false,
      },
      yAxis: {
        min: 0,
        max: 30,
        title: {
          text: 'Total time consumption',
        },
        labels: {
          style: {
            fontSize: '8px'
          },
          formatter: function () {
            return this.axis.defaultLabelFormatter.call(this) + 'min(s)';
          },
        },
      },
      legend: {
        reversed: true,
        enabled: false,
      },
      tooltip: {
        formatter: function () {
          return  this.point.series.userOptions.description;
        },
      },
      plotOptions: {
        bar: {
          // showInLegend: true,
          dataLabels: {
            enabled: true,
            formatter: function () {
              return this.point.y;
            },
            style: {
              fontWeight: 'bold',
            },
          },
          borderRadius: 5
        },
        series: {
          stacking: 'normal',
        },
      },
      series:exampleData
      });

      //this.oneLineBar.ref$.subscribe((res:any)=>{ res.hideLoading(); })
     // this.oneLineBar.ref$.subscribe((res:any)=>{ res.showLoading(); })
  }

  onUpdateData() {
   
  }

}
