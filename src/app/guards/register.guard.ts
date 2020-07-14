import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router'
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SettingsService } from '../services/settings.service';



@Injectable({
    providedIn: 'root'
})
export class RegisterGuard implements CanActivate {

    constructor(
        private router: Router,
        private auth: AngularFireAuth,
        private settingService: SettingsService
    ) {
    
    }

    canActivate(): boolean { 
        if (this.settingService.getSettings().allowRegistration) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false
        }
    }
}