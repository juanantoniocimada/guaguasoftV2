import { Component, inject, OnInit } from '@angular/core';
import { TitleComponent } from '../../../components/title/title.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { StepsModule } from 'primeng/steps';
import { HttpClientModule } from '@angular/common/http';
import { HourService } from '../../../services/hour.service';
import { RouteService } from '../../../services/route.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LocationsRoutesService } from '../../../services/locations-routes.service';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-restrictions-locations-day-of-the-week',
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

  templateUrl: './restrictions-locations-day-of-the-week.component.html',
  styleUrl: './restrictions-locations-day-of-the-week.component.scss'
})
export class RestrictionsLocationsDayOfTheWeekComponent implements OnInit {

  private _routeService= inject(RouteService);
  private _loaderService= inject(LoaderService);
  private _messageService= inject(MessageService);
  private _locationsRoutesService= inject(LocationsRoutesService);

  routes: any[] = [];
  route: any;

  locations: any[] = [];

  ngOnInit(): void {
    this.getRoutes()
  }

  public startLoading() {
    this._loaderService.showIndeterminate();
  }

  public stopLoading() {
    this._loaderService.hideLoader();
  }

  onOptionChange(event: any): void {
    this.getLocations(event)
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
