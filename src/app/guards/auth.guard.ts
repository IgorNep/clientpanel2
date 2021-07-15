import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canProceed!: boolean;
  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  canActivate(): Observable<boolean> {
    this.afAuth.authState.subscribe((res) => {
      if (!res || !res.uid) {
        this.router.navigate(['/login']);
        this.canProceed = false;
      } else {
        this.canProceed = true;
      }
    });
    return of(this.canProceed);
  }
}
