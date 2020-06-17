import {ProfileElement, ProfileService} from '../../profile.service';
import {SurveyElement, SurveyService} from '../../survey.service';
import {AuthService} from '../../auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import * as firebase from 'Firebase';

import { Component, ViewChild, OnInit } from '@angular/core';
import { statsViewData } from './sample';

// Bank of colors to diffentiate line graph measures
const lineColors = ['rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)'];

// Array of qualitative wellness measures...
const qualitativeScale = ['Very Bad', 'Bad', 'Neutral', 'Good', 'Very Good'];

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {
  @ViewChild('lineCanvas', { static: false }) lineCanvas;
  
  Profile: Observable<ProfileElement>;
  public uid;
  Survey: Observable<SurveyElement>;

  assetPath = '../../../assets/chart/';
  wheel: any = '../../../assets/chart/numberedwheel.svg';
  bar: any = '../../../assets/chart/numberedbar.svg';

  stats = statsViewData;
  wellbeingIndex = this.stats.WellbeingIndex;
  colorZone = this.wellbeingIndex >= 100 ? 4 :
    Math.floor(this.wellbeingIndex / 20);
  coloredDial = this.assetPath + 'dial' + this.colorZone + '.svg';
  wellbeingQual = qualitativeScale[this.colorZone];
  wellbeingTextColor = this.colorZone === 4 ? 'white' : 'black';

  environmentalQualityIndex = this.stats.EnvironmentalQualityIndex;
  environmentZone = this.environmentalQualityIndex >= 100 ? 4 :
    Math.floor((this.environmentalQualityIndex) / 20);
  temperatureLegend = this.assetPath + 'temperature' + this.environmentZone + '.svg';
  environmentalQual = qualitativeScale[this.environmentZone];
  environmentalTextColor = this.environmentZone === 4 ? 'white' : 'black';

  yesterdayIndex = this.stats.YesterdayWellbeingIndex;
  yesterdayZone = this.yesterdayIndex >= 100 ? 4 :
    Math.floor((this.yesterdayIndex) / 20);
  yesterdayClass = 'GuageColor' + this.yesterdayZone;
  yesterdayTextColor = this.yesterdayZone === 4 ? 'white' : 'black';

  tomorrowIndex = this.stats.TomorrowWellbeingIndex;
  tomorrowZone = this.tomorrowIndex >= 100 ? 4 :
    Math.floor((this.tomorrowIndex) / 20);
  tomorrowClass = 'GuageColor' + this.tomorrowZone;
  tomorrowTextColor = this.tomorrowZone === 4 ? 'white' : 'black';

  dialRotation = {
    transform: `
      rotate(${(this.wellbeingIndex / 100.00) * 300 - 150}deg)
    `
  };

  temperatureShift = {
    transform: `
      translateX(${(this.environmentalQualityIndex / 100.00) * 217 + 132}px)
  `
  };

  panels = this.stats.panels as Array<object>;
  isOpen = Array(this.panels.length).map(item => false);

  constructor(
    private proService: ProfileService,
    private survService: SurveyService,
    public afAuth: AngularFireAuth,
    private auth: AuthService
  ) {
    this.uid = this.auth.cUid;
    
    firebase.database().ref('Environment/Airquality')
    .orderByKey().limitToLast(3)
    .on('value', resp => {
      console.log(`FIREBASE: ${ JSON.stringify(resp) }`);
    });
  }

  ngOnInit() {
    this.Profile = this.proService.pro(this.uid);    
    this.Profile.subscribe(profile=>console.log(profile));
    this.Survey = this.survService.surv('2020-06-15'); // TODO: Today's date formula
    this.Survey.subscribe(surv=>console.log(surv));
  }

}
