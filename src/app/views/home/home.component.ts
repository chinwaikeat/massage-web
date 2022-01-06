import { Component, OnInit } from '@angular/core';
import {Chart} from 'angular-highcharts';
import { donutChartOptions} from '../../utils/donutChartOptions'
import { areaChartOptions} from '../../utils/areaChartOptions'
import { barChart} from '../../utils/barChart'
import { oneLineBar} from '../../utils/oneLineBar'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  chart = new Chart(donutChartOptions);
  areaSplineChart = new Chart(areaChartOptions);
  barChart = new Chart(barChart);
  oneLineBar = new Chart(oneLineBar);

}
