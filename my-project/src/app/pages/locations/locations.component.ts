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
    HttpClientModule
  ],
  providers:[
    HourService,
    RouteService,
    MessageService,
    ConfirmationService
  ],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.scss'
})
export class LocationsComponent {

  routes: any[] = [];
  route: any;

  private _routeService= inject(RouteService);
  private _messageService= inject(MessageService);
  private _loaderService= inject(LoaderService);

  activeIndex: number = 0;

  locations: any[] = [];
  location: any = {};

  ngOnInit(): void {
    this.getRoutes();
  }

  add() {

  }

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
    this.location =
    this.locations[event]

  }

  getLocations(idRoute: any) {
    this.startLoading();

    this._routeService.getLocationsByRoute(idRoute).subscribe({
      next: (data: any) => {
        this.locations = data;
        this.stopLoading();
      },
      error: (error: any) => {
        this.stopLoading();
        this._messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Error en la llamada', life: 3000 });
      },
      complete: () => { }
    });
  }

  onOptionChange(event: any): void {
    this.getLocations(event.value.id)
  }

  startLoading() {
    this._loaderService.showIndeterminate();
  }

  stopLoading() {
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

        this._messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Error en la llamada', life: 3000 });

      },
      complete: () => { }
    });
  }

}
