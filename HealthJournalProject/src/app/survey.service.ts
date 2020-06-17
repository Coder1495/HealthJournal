import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

import {map, take} from 'rxjs/operators';

import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

export interface SurveyElement 
{
  cancer ?: {
    bladderControlIssues: number;
    dryMouth: number;
    neuropathy: number;
    nightSweatsFlashes: number;
    pain: number;
    skinSensitivity: number;
    stomachProblem: number;
    swelling: number;
    tiredness: number;
    unintentionalWeight: number;
  };
  feel : number;
  summary : {
    summary: string;
  };
  cardiovascular: {
    cough: number;
    fatique: number;
    hoarseness: number;
    pain: number;
    shortnessOfBreath: number;
    sweatLegs: number;
    unexplainedLossOfWeight: number;
  }
}

@Injectable({
    providedIn: 'root'
})
export class SurveyService {
    public nickName: string;
    public patient: string;

    public Survey: Observable<SurveyElement[]>;
    proCollection: AngularFirestoreCollection<SurveyElement>;
    uid;

    constructor(
        private afStore: AngularFirestore,
        public auth: AuthService) {
        this.uid = this.auth.cUid;
        this.proCollection = this.afStore.collection<SurveyElement>('users');
        this.Survey = this.proCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return {id, ...data};
                });
            })
        );
    }

    setSurvey(surv: SurveyElement, id: any) {
        return this.proCollection.doc(id).set(surv, {merge: true});
    }

    /*
    updateSurvey(surv: SurveyElement, id): Promise<void> {
        return this.proCollection.doc(id).update({
        });
    }
    */

    getSurv(): Observable<SurveyElement[]> {
        return this.Survey;
    }

    surv(id: string): Observable<SurveyElement> {
        const url = `users/${this.uid}/survey/`;
        console.log(`url=${url}`)
        return this.afStore.collection(url).doc<SurveyElement>(id).valueChanges().pipe(
            take(1),
            map(surv => {
                return surv;
            })
        );
    }
}
