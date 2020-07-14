import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from "../../models/Client";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[];
  totalOwed: number;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      this.totalOwed = this.getTotalOwed();
    });
  }

  getTotalOwed(): number {
    const total = this.clients.reduce((total, client) => {
      return total + parseFloat(client.balance.toString());
    }, 0);

    return total;
  }
}
