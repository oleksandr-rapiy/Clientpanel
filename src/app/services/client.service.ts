import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from "../models/Client";
import { ThrowStmt } from '@angular/compiler';

/*
  Angular Firestore documentation https://github.com/angular/angularfire/blob/master/docs/firestore/collections.md
*/

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private readonly angularFiretore: AngularFirestore) {
    this.clientsCollection = this.angularFiretore.collection('clients', ref => ref.orderBy('lastName', 'asc'));
  }

  getClients(): Observable<Client[]> {
    // Get clients with the id
    this.clients = this.clientsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Client;
        data.id = a.payload.doc.id;
        return data;
      }))
    );

    return this.clients;
  }

  addClient(client: Client) {
    this.clientsCollection.add(client);
  }

  getClient(id: string): Observable<Client>{
    this.clientDoc = this.angularFiretore.doc<Client>(`clients/${id}`);
    this.client = this.clientDoc.snapshotChanges().pipe(
      map(actions => {
        if (actions.payload.exists === false) {
          return null;
        } else {
          const data = actions.payload.data() as Client;
          data.id = actions.payload.id;
          return data;
        }
      }
    ));
    return this.client;
  }

  updateClient(client: Client) {
    this.clientDoc = this.angularFiretore.doc(`clients/${client.id}`);
    this.clientDoc.update(client);
  }

  deleteClient(client: Client) {
    this.clientDoc = this.angularFiretore.doc(`clients/${client.id}`);
    this.clientDoc.delete();
  }
}
