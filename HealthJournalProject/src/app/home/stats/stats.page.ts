import { Component, ViewChild, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {
  @ViewChild('barCanvas',{ static: false }) barCanvas;
  @ViewChild('doughnutCanvas', { static: false }) doughnutCanvas;
  @ViewChild('lineCanvas', { static: false }) lineCanvas;

  dial: any = '../../../assets/chart/Dial3.svg';
  color_wheel: any = '../../../assets/chart/color-wheel.svg';
  bar: any = '../../../assets/chart/bar.svg'; 

  barChart: any;
  doughnutChart: any;
  lineChart: any;

  constructor() {

  }

  ngOnInit() {
    this.lineChartMethod();
  }



lineChartMethod() {
  var ctx = (document.getElementById('chart') as HTMLCanvasElement).getContext('2d');
  var chart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: Array.from({length: 14}, (e, i)=> i+1),
          datasets: [
            {
              label: 'Wellbeing',
              fill: false,
              data: Array.from({length: 14}, (e, i)=> Math.sin(i*3)*10 +20),
              borderColor: [
                  'rgba(255, 99, 132, 1)',
//                  'rgba(54, 162, 235, 1)',
//                  'rgba(255, 206, 86, 1)',
//                  'rgba(75, 192, 192, 1)',
//                  'rgba(153, 102, 255, 1)',
//                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          },
          {
            label: 'QOL',
            fill: false,
            data: Array.from({length: 31}, (e, i)=> Math.cos(i*4)*10 + 40),
            borderColor: [
//                'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
//                  'rgba(255, 206, 86, 1)',
//                  'rgba(75, 192, 192, 1)',
//                  'rgba(153, 102, 255, 1)',
//                  'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        },
      
        ]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true,
                      max: 100,
                      stepSize: 20
                  },
                  scaleLabel: { 
                    display: true,
                    labelString: 'Wellbeing and QOL'
                  }
              }],
              xAxes: [{
                ticks: {
                    max: 31,
                    stepSize: 1
                },
                scaleLabel: { 
                  display: true,
                  labelString: 'Day of Month'
                }
            }]              
          }
      }
  });
}




}