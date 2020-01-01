import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };
  disableBalanceOnAdd: boolean;
  @ViewChild('clientForm', { static: false }) form: any;
  constructor(
    private _flashMessagesService: FlashMessagesService,
    private clientService: ClientService,
    private settingService: SettingsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if (!valid) {
      // Show error
      this._flashMessagesService.show('Please fill out the form correctly', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    } else {
      // Add new client
      this.clientService.newClient(value);
      // Show message
      this._flashMessagesService.show('New client added', {
        cssClass: 'alert-success',
        timeout: 4000
      });
      // Redirect
      this.router.navigate(['/']);
    }
  }
}
