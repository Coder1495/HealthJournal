import { Component, ViewChild, OnInit, Input, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

const lineColors = ['rgba(255, 99, 132, 1)', 
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'];
                 
// Type _Chart used to avoid tsc warnings about no stepSize
// property - @types are slightly out-of-date, but including @types/chartjs 
// is still helpful and the 'any' below can be removed to IDE type assistance.  
// This relates to the new _Chart object instantiation below...                  
type _Chart = typeof Chart | any;

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {

  @Input() panel:object;
  @Input() open?:boolean;

  @ViewChild('chart', { static: true }) refCanvas : ElementRef<HTMLCanvasElement>;

  elemCanvas : HTMLCanvasElement;
  ctxCanvas : CanvasRenderingContext2D;

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.elemCanvas = this.refCanvas.nativeElement as HTMLCanvasElement;
    this.ctxCanvas = this.elemCanvas.getContext('2d');
    this.renderChart();
  }

  private clickHandler(event): void {
    this.open = !this.open;
    this.renderChart();
  }

  private renderChart() {
    if (this.open) {
      this.lineChartMethod(this.ctxCanvas, this.panel);
      this.elemCanvas.style.display = 'block';
    } else
      this.elemCanvas.style.display = 'none';
  }

  private lineChartMethod(ctxCanvas, panelData) {
    Chart.defaults.global.defaultFontColor = "#ffffff";
    new (Chart as _Chart)(ctxCanvas, {
        type: 'line',
        defaultFontColor: "#FFFFFF",
        data: {
            labels: Array.from({length: 14}, (e, i)=> (i+14).toString()),
            datasets: panelData.measures.map((measure,ndx) => ({
                  label: measure.title,
                  fill: false,
                  data: measure.twoWeeksData,
                  borderColor: lineColors[ndx],
                  borderWidth: 1
                }))
        },
        options: {
            scales: {
                yAxes: [{
                  // 'right' highlights 'today' but 'left' is more conventional...
                  position: 'left', 
                  gridLines : {
                    color: 'grey'
                  },
                  ticks: {
                        beginAtZero: true,
                        max: 100,
                        stepSize: 20,
                        callback: function(value) {
                          return `${value}%   `.slice(0,4); // approx. center align
                        } as any
                    },
                    scaleLabel: { 
                      display: true,
                      // approx. full justify align
                      labelString: 'Wellbeing and QOL'
                    }
                }],
                xAxes: [{
                  gridLines : {
                    color: 'grey'
                  },
                  ticks: {
                      max: 31,
                      stepSize: 1
                  },
                  scaleLabel: { 
                    display: true,
                    labelString: 'Dates - Two Weeks History'
  // other alternatives explored:
  //                  labelString: 'Dates:  Two Weeks History — Today'
  //                  labelString: '← Two weeks history                           Today →'
                  }
              }]              
            }
        }
    });
  }
  

}
