import { Component, ViewChild, OnInit } from '@angular/core';
import { statsViewData } from './sample';

const lineColors = ['rgba(255, 99, 132, 1)', 
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'];

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {
  @ViewChild('lineCanvas', { static: false }) lineCanvas;

  dial: any = '../../../assets/chart/Dial3.svg';
  color_wheel: any = '../../../assets/chart/color-wheel.svg';
  bar: any = '../../../assets/chart/bar.svg'; 

  panels = statsViewData.panels;

  constructor() {
  }

  ngOnInit() {
  }

}