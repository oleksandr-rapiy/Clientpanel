import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;

  constructor(
    private flashMessage: FlashMessagesService, 
    private router: Router,
    private authService: AuthService,
    private settingService: SettingsService
  ) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email
      } else { 
        this.isLoggedIn = false;
      }
    });
    
    this.showRegister = this.settingService.getSettings().allowRegistration;
  }

  onLogout() {
    this.authService.logout();
    this.flashMessage.show('You are now logout', {
      cssClass: 'alert-success', timeout:4000
    })
    this.router.navigate(['/login'])
  }

}
