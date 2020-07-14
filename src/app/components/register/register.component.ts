import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/User';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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
  }

  onSubmit() {
    this.authService.register(this.user)
    .then(res => {
      this.flashMessageSevice.show('You are now registred and logged in', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/']);
    })
    .catch(err => {
      this.flashMessageSevice.show(err, {
        cssClass: 'alert-danger', timeout: 4000
      });
    })
  }
}
