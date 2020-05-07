import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { LoggingService } from 'src/app/modules/core';

import { Product, ProductProcess } from 'src/app/modules/manager/models';
import { Unit, Component, ProductComponent } from 'src/app/modules/manager/models';
import { Ingredient, Recipe, MenuEntry, Menu } from 'src/app/modules/manager/models';

import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseBackendService {

  private productsRef: AngularFireList<any>;
  private productRef: AngularFireObject<any>;

  constructor(
    private db: AngularFireDatabase,
    private firestore: AngularFirestore,
    private logger: LoggingService,
  ) {}


  // getProducts(): Observable<Product> {
  //   return this.firestore.collection('products').snapshotChanges().pipe(
  //     map(changes => {
  //       return changes.map(a => {
  //         const data = a.payload.doc.data() as Product;
  //         data.id = parseInt(a.payload.doc.id);
  //         // data.id = a.payload.doc.id;
  //         return data;
  //       });
  //     })
  //   );
  // }


  // getMenu2(id: string) {
  //
  //
  //       // let collectionRef = this.firestore.collection('menus');
  //       //
  //       // collectionRef.add({foo: 'bar'}).then(documentReference => {
  //       //   let firestore = documentReference.firestore;
  //       //   console.log(`Root location for document is ${firestore.formattedName}`);
  //       // });
  //
  //       let query = this.firestore.collection('menus');
  //       // query.orderBy('foo').endAt(42).get().then(querySnapshot => {
  //       query.get().then(querySnapshot => {
  //         querySnapshot.forEach(documentSnapshot => {
  //           console.log(`Found document at ${documentSnapshot.ref.path}`);
  //         });
  //       });
  //
  //   //
  //   // // this.firestore.collection("menus").where("name", "==", "Semanal2")
  //   // let a = this.firestore.collection("menus", r => r.where("name", "==", "Semanal2"))
  //   //     .get().docs.map(doc => doc.data());
  //   //     // .then(function(querySnapshot) {
  //   //     //     querySnapshot.forEach(function(doc) {
  //   //     //         // doc.data() is never undefined for query doc snapshots
  //   //     //         console.log(doc.id, " => ", doc.data());
  //   //     //     });
  //   //     // })
  //   //     // .catch(function(error) {
  //   //     //     console.log("Error getting documents: ", error);
  //   //     // });
  //   //     this.logger.debug(a);
  // }

  // getMenu(id: string): Observable<Menu> {
  //   return this.firestore.collection('menus').doc(id).snapshotChanges().pipe(
  //     map(doc => {
  //       if (doc.payload.exists) {
  //         const data = doc.payload.data() as Menu;
  //         const payloadId = parseInt(doc.payload.id);
  //         // const payloadId = doc.payload.id;
  //         return { id: payloadId, ...data };
  //       }
  //     })
  //   );
  // }
}
