import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }

  async onSubmit() {
    try {
      await this.authService.login(this.email, this.password);
      this._flashMessagesService.show('You are logged in', {
        cssClass: 'alert-success',
        timeout: 4000
      });
      this.router.navigate(['/']);
    } catch (err) {
      this._flashMessagesService.show(err.message, {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    }
  }
}
