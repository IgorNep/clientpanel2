import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Client } from '../models/Client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  clientsCollection!: AngularFirestoreCollection<Client>;
  clientDoc!: AngularFirestoreDocument<Client>;
  clients!: Observable<Client[]>;
  client: Observable<Client> | any;

  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection<Client>('clients');
  }

  getClients(): Observable<Client[]> {
    this.clients = this.clientsCollection.valueChanges({
      idField: 'id',
    });
    return this.clients;
  }

  getClient(id: string): Observable<Client> {
    this.clientDoc = this.afs.doc<Client>(`clients/${id}`);
    this.client = this.clientDoc.valueChanges({ idField: 'id' });
    return this.client;
  }

  addClient(client: Client) {
    this.clientsCollection.add(client);
  }
  updateClient(client: Client) {
    this.clientDoc = this.afs.doc<Client>(`clients/${client.id}`);
    this.clientDoc.update(client);
  }
  deleteClient(client: Client) {
    this.clientDoc = this.afs.doc<Client>(`clients/${client.id}`);
    this.clientDoc.delete();
  }
}
