import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  constructor(
    private _flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  async onSubmit() {
    try {
      await this.authService.register(this.email, this.password);
      this._flashMessagesService.show('You are now registered and logged in', {
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
