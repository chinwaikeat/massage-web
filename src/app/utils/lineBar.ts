import { Chart } from 'angular-highcharts';

function ConstructureLineBar(data:any){

    var oneLineBar = new Chart({
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
          reversedStacks: false,
          min: 0,
          max: 30,
          title: {
            text: 'Total time consumption',
          },
          labels: {
            style: {
              fontSize: '8px',
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
            return this.point.series.userOptions.description;
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
            borderRadius: 5,
          },
          series: {
            stacking: 'normal',
          },
        },
        series: data,
      });

    return oneLineBar;
}

export default ConstructureLineBar