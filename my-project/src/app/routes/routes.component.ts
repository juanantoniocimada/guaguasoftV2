import { Component, OnInit, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RouteService } from '../services/route.service';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { LoaderService } from '../services/loader.service';
import { TitleComponent } from "../components/title/title.component";

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    DropdownModule,
    HttpClientModule,
    TitleComponent,

],
  providers:[
    RouteService,
    MessageService,
    ConfirmationService
  ],
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.scss'
})
export class RoutesComponent implements OnInit {

  routes: any[] = [];
  route: any;

  private _itemService  =inject(RouteService);
  private _confirmationService  =inject(ConfirmationService);
  private _messageService  =inject(MessageService);
  private _loaderService  =inject(LoaderService);
  private _router= inject(Router) ;

  ngOnInit(): void {
    this.getRoutes();
  }

  add() {
    this._router.navigate(['/form-route'], { queryParams: { edit: false, id: 0 } });
  }

  edit(routeId: number) {
    this._router.navigate(['/form-route'], { queryParams: { edit: true, id: routeId } });
  }

  deleteRoute(routeId: number) {

    this.startLoading();

    this._itemService.deleteItem(routeId).subscribe({
      next: (data: any) => {
        this.stopLoading();

        this._messageService.add({ severity: 'success', summary: 'Rejected', detail: 'Borrado correctamente', life: 3000 });

        this.getRoutes();

      },
      error: (error: any) => {
        this.stopLoading();
        this._messageService.add({
          severity: 'error',
          summary: JSON.stringify(error),
          life: 3000,
        });
      },
      complete: () => { }
    });
  }

  delete(id: number) {
    this._confirmationService.confirm({
      header: `Borrar`,
      accept: () => {
        this.deleteRoute(id);
      },
      reject: () => {
          this._messageService.add({ severity: 'error', summary: 'Rejected', detail: 'no se ha podido borrar', life: 3000 });
      }
    });
  }

  startLoading() {
    this._loaderService.showIndeterminate();
  }

  stopLoading() {
    this._loaderService.hideLoader();
  }

  getRoutes(): void {
    this.startLoading();

    this._itemService.getAllItems().subscribe({
      next: (data: any) => {
        this.routes = data;
        this.stopLoading();

      },
      error: (error: any) => {
        this.stopLoading();

        this._messageService.add({
          severity: 'error',
          summary: JSON.stringify(error),
          life: 3000,
        });
      },
      complete: () => { }
    });
  }

}
