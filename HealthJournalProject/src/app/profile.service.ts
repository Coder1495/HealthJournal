import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';


import {Router} from '@angular/router';
import {map, take} from 'rxjs/operators';

import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

export interface ProfileElement {
  id?: any;
  patient: string;
  fullName: string;
  nickName: string;
  gender: string;
  age: number;
  maritalStatus: string;

  work: string;
  natureOfJob: string;

  chronicProblem: string;

  hospital: string;
  doctor: string;
  procedure: string;
  medication: string;
  sideEffect: string;

  ethnicity: string;
  foodHabbit: string;
  citiesLivedpast: string;

  state: string;
  city: string;
  streetName: string;
  streetNumber: number;
  zipCode: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public nickName: string;
  public patient: string;

  public profile: Observable<ProfileElement[]>;
  proCollection: AngularFirestoreCollection<ProfileElement>;
  uid;

  constructor(
    private afStore: AngularFirestore,
    private router: Router,
    public auth: AuthService) {
    this.uid = this.auth.cUid;
    this.proCollection = this.afStore.collection<ProfileElement>('users');
    this.profile = this.proCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }

  setProfile(pro: ProfileElement, id: any) {
    return this.proCollection.doc(id).set(pro, {merge: true});
  }

  updateProfile(pro: ProfileElement, id): Promise<void> {
    return this.proCollection.doc(id).update({
      fullName: pro.fullName,
      nickName: pro.nickName,
      gender: pro.gender,
      age: pro.age,
      patient: pro.patient,
      maritalStatus: pro.maritalStatus,
      work: pro.work,
      natureOfJob: pro.natureOfJob,
      state: pro.state,
      city: pro.city,
      streetName: pro.streetName,
      streetNumber: pro.streetNumber,
      chronicProblem: pro.chronicProblem,
      hospital: pro.hospital,
      doctor: pro.doctor,
      procedure: pro.procedure,
      medication: pro.medication,
      sideEffect: pro.sideEffect,
      ethnicity: pro.ethnicity,
      foodHabbit: pro.foodHabbit,
      citiesLivedpast: pro.citiesLivedpast
    });
  }

  getPro(): Observable<ProfileElement[]> {
    return this.profile;
  }

  pro(id: string): Observable<ProfileElement> {
    return this.afStore.collection('users').doc<ProfileElement>(id).valueChanges().pipe(
      take(1),
      map(pro => {
        this.nickName = pro.nickName;
        this.patient = pro.patient;
        console.log(this.nickName, this.patient);
        return pro;
      })
    );
  }
}
