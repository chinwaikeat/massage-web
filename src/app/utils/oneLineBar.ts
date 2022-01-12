// import { Options } from 'highcharts';
// import { Component, Input } from '@angular/core';

// export const oneLineBar: Options = {

//   chart: {
//     type: 'bar',
//     height: 200,
//   },
//   title: {
//     text: 'Time allocate for massage',
//   },
//   subtitle: {
//     text: 'Source: WorldClimate.com',
//   },
//   xAxis: {
//     visible: false,
//   },
//   yAxis: {
//     min: 0,
//     max: 30,
//     title: {
//       text: 'Total fruit consumption',
//     },
//     labels: {
//       style: {
//         fontSize: '8px'
//       },
//       formatter: function () {
//         return this.axis.defaultLabelFormatter.call(this) + 'min(s)';
//       },
//     },
//   },
//   legend: {
//     reversed: true,
//     enabled: false,
//   },
//   tooltip: {
//     formatter: function () {
//       return 'Duration: ' + this.point.y + '<br/>  Strength: ' + this.point.strength;
//     },
//   },
//   plotOptions: {
//     bar: {
//       // showInLegend: true,
//       dataLabels: {
//         enabled: true,
//         formatter: function () {
//           return this.point.y;
//         },
//         style: {
//           fontWeight: 'bold',
//         },
//       },
//       borderRadius: 5
//     },
//     series: {
//       stacking: 'normal',
//     },
//   },
//   series: [
//     {
//      // name: 'John',
//       data: [{
//         y: 5,
//         locked: 50,
//     }],
//     },
//     {
//      // name: 'Jane',
//       data: [{
//         y: 2,
//         strength: 30,
//     }],
//     },
//     {
//       name: 'Joe',
//       data: [{
//         y: 3,
//         strength: 20,
//     }],
//     },
//     {
//      // name: 'Jane',
//       data: [{
//         y: 4,
//         strength: 70,
//     }],
//     },
//     {
//      // name: 'Jane',
//       data: [{
//         y: 1,
//         strength: 30,
//     }],
//     },
//     {
//     //  name: 'Jane',
//       data: [{
//         y: 6,
//         strength: 40,
//     }],
//     },
//     {
//     //  name: 'Jane',
//       data: [{
//         y: 4,
//         strength: 50,
//     }],
//     },
//     {
//      // name: 'Jane',
//       data: [{
//         y: 5,
//         strength: 50,
//     }],
//     },
//   ],
// };
