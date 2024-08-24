import { Component, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HourService } from '../../services/hour.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { RouteService } from '../../services/route.service';
import { CommonModule } from '@angular/common';
import { StepsModule } from 'primeng/steps';
import { HttpClientModule } from '@angular/common/http';
import { LoaderService } from '../../services/loader.service';
import { Router } from '@angular/router';
import { LocationsRoutesService } from '../../services/locations-routes.service';
import { TitleComponent } from "../../components/title/title.component";

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    FormsModule,
    DropdownModule,
    CommonModule,
    StepsModule,
    HttpClientModule,
    TitleComponent
],
  providers:[
    HourService,
    RouteService,
    MessageService,
    ConfirmationService,
    LocationsRoutesService
  ],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.scss'
})
export class LocationsComponent {

  routes: any[] = [];
  route: any;

  private _routeService= inject(RouteService);
  private _locationsRoutesService= inject(LocationsRoutesService);
  private _messageService= inject(MessageService);
  private _loaderService= inject(LoaderService);
  private _confirmationService= inject(ConfirmationService);
  private _router= inject(Router);

  activeIndex: number = 0;

  locations: any[] = [];
  location: any = {};

  ngOnInit(): void {
    this.getRoutes();
  }

  add() {
    this._router.navigate(['/form-location'], { queryParams: { edit: false, id: 0 } });
  }

  edit(location: any) {
    this._router.navigate(['/form-location'], { queryParams: { edit: true, id: location['id_locations_routes'] } });
  }

  confirm(location: any) {

    this._confirmationService.confirm({
        header: `Borrar`,
        accept: () => {
          this.deleteLocation(location['id_locations_routes']);
        },
        reject: () => {
            this._messageService.add({ severity: 'error', summary: 'Rejected', detail: 'no se ha podido borrar', life: 3000 });
        }
    });
  }

  deleteLocation(id: any) {

    this.startLoading();

    this._locationsRoutesService.deleteLocation(id).subscribe({
      next: (data: any) => {

        this.stopLoading();
        // this.getLocations(location)

        this._messageService.add({ severity: 'success', summary: 'success', detail: 'Borrado correctamente', life: 3000 });

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

  getLocations(data: any) {
    this.startLoading();

    this._locationsRoutesService.getLocationsByRoute(data.value.id_routes).subscribe({
      next: (data: any) => {
        this.locations = data;
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

  onOptionChange(event: any): void {
    this.getLocations(event)
  }

  public startLoading() {
    this._loaderService.showIndeterminate();
  }

  public stopLoading() {
    this._loaderService.hideLoader();
  }

  getRoutes(): void {
    this.startLoading();

    this._routeService.getAllItems().subscribe({
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
