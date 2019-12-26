import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private clientService: ClientService,
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
  }

  updateBalance() {
    this.showBalanceUpdateInput = false;
    this.clientService.updateClient(this.client);
    this._flashMessagesService.show('Balance updated', {
      cssClass: 'alert-success',
      timeout: 4000
    });
  }
}
