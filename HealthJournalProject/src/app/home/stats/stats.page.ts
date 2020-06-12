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

  assetPath = '../../../assets/chart/';
  wheel: any = '../../../assets/chart/numberedwheel.svg';
  bar: any = '../../../assets/chart/numberedbar.svg'; 

  stats = statsViewData;
  wellbeingIndex = this.stats.WellbeingIndex;
  colorZone = Math.floor(this.wellbeingIndex / 20);

  coloredDial = this.assetPath+'dial'+this.colorZone+'.svg';
  temperatureLegend = this.assetPath+'temperature'+this.colorZone+'.svg';

  dialRotation = { 
    'width': '90px',
    'transform': `
    translateY(30px) 
    rotate(${ (this.wellbeingIndex/100.00) * 300 - 150 }deg)
  `};

  panels = this.stats.panels as Array<object>;
  isOpen = Array(this.panels.length).map(item=>false);

  constructor() {
  }

  ngOnInit() {
  }

}