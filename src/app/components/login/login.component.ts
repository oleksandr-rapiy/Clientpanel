import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/User';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {
    email: '',
    password: ''
  }

  constructor(
    private authService: AuthService,
    private flashMessageSevice: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.router.navigate(['/'])
      }
    })
  }

  onSubmit() {
    this.authService.login(this.user)
    .then(response => {
      this.flashMessageSevice.show('You are now log in', {
        cssClass: 'alert-success', timeout:4000 
      })

      this.router.navigate(['/']);
    })
    .catch(error => {
      this.flashMessageSevice.show(error, {
        cssClass: 'alert-danger', timeout: 5000 
      });
    })
  }

}
