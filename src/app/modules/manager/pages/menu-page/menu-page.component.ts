import { Component, OnInit } from '@angular/core';

import { LoggingService } from 'src/app/modules/core';
import { BackendService } from 'src/app/modules/manager/services';
import { FirebaseBackendService } from 'src/app/modules/manager/services';

import { ResultList } from 'src/app/modules/core/models';

import { Product, ProductProcess } from 'src/app/modules/manager/models';
import { Unit, ProductComponent } from 'src/app/modules/manager/models';
import { Ingredient, Recipe, MenuEntry, Menu } from 'src/app/modules/manager/models';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent implements OnInit {

  public products: any[];
  public menu: Menu;

  constructor(
    private logger: LoggingService,
    private backend: BackendService,
    // private fbBackend: FirebaseBackendService,
  ) { }

  ngOnInit(): void {

    // this.fbBackend.getProducts().subscribe(
    //   (data: Product[]) => {
    //     this.products = data;
    //   },
    //   (error: any) => {
    //     this.logger.error("Error no contemplado.");
    //   }
    // );
    //
    //
    // this.fbBackend.getMenu('semanal').subscribe(
    //   (data: Menu) => {
    //     this.logger.info(data);
    //     this.menu = data;
    //   }
    // );
    //

    // this.fbBackend.getMenu2('semanal');

    // this.fbBackend.getMenu('semanal').subscribe((snapshot) => {
    //
    //   this.logger.info(snapshot.payload.doc);
    //
    //   // catsSnapshot.forEach((data: any) => {
    //   //   this.logger.info(data);
    //   //   this.menu = data.payload.doc.data()
    //   // })
    // });

    // this.fbBackend.getProducts().snapshotChanges().subscribe(products => {
    //     products.forEach(product => {
    //       let a = product.payload.toJSON();
    //       a['$key'] = product.key;
    //       this.entries_b.push(a as Product)
    //     });
    //     /* Data table */
    //     // this.dataSource = new MatTableDataSource(this.BookData);
    //     /* Pagination */
    //     // setTimeout(() => {
    //       // this.dataSource.paginator = this.paginator;
    //     // }, 0);
    // })
  }

}
