import { Options } from 'highcharts';

export const oneLineBar: Options = {
  chart: {
    type: 'bar',
    height: 100,

  },
  title: {
    text: 'Fruit Consumption'
  },
  xAxis: {
    visible: false,
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
  },
  yAxis: {
    visible: false,
  },
  legend: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    series: {
      stacking: "percent",
      borderRadius: 5
    } as any,
  },

  series: [
    {
      type: 'bar',
      color: '#506ef9',
      data: [3],

    },
    {
      name: "keat \n sasa" ,
      type: 'bar',
      color: '#E000FF',
      data: [5],
      
    },
    {
      type: 'bar',
      color: '#ccc',
      data: [2]
    },
    {
      type: 'bar',
      color: '#F0FF00',
      data: [10]
    },
    {
      type: 'bar',
      color: '#00FF00',
      data: [5]
    },
    {
      type: 'bar',
      color: '#00FF00',
      data: [5]
    },
  ],
};