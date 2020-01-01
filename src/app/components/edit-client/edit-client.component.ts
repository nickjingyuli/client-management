import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { SettingsService } from '../../services/settings.service';
import { Client } from '../../models/Client';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };
  disableBalanceOnEdit: boolean;

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private clientService: ClientService,
    private settingService: SettingsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Get id from the url
    this.id = this.route.snapshot.params['id'];
    // Get client
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
    });
    this.disableBalanceOnEdit = this.settingService.getSettings().disableBalanceOnEdit;
  }

  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    if (!valid) {
      // Show error
      this._flashMessagesService.show('Please fill out the form correctly', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    } else {
      // Add id to client
      value.id = this.id;
      // Update clients
      this.clientService.updateClient(value);
      // Show message
      this._flashMessagesService.show('Client updated', {
        cssClass: 'alert-success',
        timeout: 4000
      });
      // Redirect
      this.router.navigate([`/client/${this.id}`]);
    }
  }
}
