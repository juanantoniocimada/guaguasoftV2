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
import { CheckboxModule } from 'primeng/checkbox';
import { FooterComponent } from '../../../components/footer/footer.component';

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
    TitleComponent,
    CheckboxModule,
    FooterComponent
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
  location: any

  public id!: string;

  public monday: boolean = true;
  public tuesday: boolean = true;
  public wednesday: boolean = true;
  public thursday: boolean = true;
  public friday: boolean = true;
  public saturday: boolean = true;
  public sunday: boolean = true;
  public festive: boolean = true;

  ctaButtons = [
    {
      text: 'editar',
      icon:'pi pi-power-off',
      action: () => this.updateItem()
    }
  ];

  ngOnInit(): void {
    this.getRoutes()
  }

  public startLoading() {
    this._loaderService.showIndeterminate();
  }

  public stopLoading() {
    this._loaderService.hideLoader();
  }

  onOptionChange2(): void {
   this.getLocationByLocationsRoutesId(
    this.location.id_locations_routes
  );

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

  selectAll() {

    this.monday = true;
    this.tuesday = true;
    this.wednesday = true;
    this.thursday = true;
    this.friday = true;
    this.saturday = true;
    this.sunday = true;
    this.festive = true;

  }

  quitAll() {
    this.monday = false;
    this.tuesday = false;
    this.wednesday = false;
    this.thursday = false;
    this.friday = false;
    this.saturday = false;
    this.sunday = false;
    this.festive = false;
  }

  selectWeekdays() {
    this.monday = true;
    this.tuesday = true;
    this.wednesday = true;
    this.thursday = true;
    this.friday = true;
  }

  quitWeekdays() {
    this.monday = false;
    this.tuesday = false;
    this.wednesday = false;
    this.thursday = false;
    this.friday = false;
  }

  selectSundaysAndHolidays() {
    this.sunday = true;
    this.festive = true;
  }

  quitSundaysAndHolidays() {
    this.sunday = false;
    this.festive = false;
  }

  parseBoolean(value: string): boolean {
    // Convertir a minúsculas y eliminar espacios en blanco

    if (value !== undefined) {
      const normalizedValue = value.trim().toLowerCase();
      // Comparar con 'true', 'false', '0' y '1'
      if (normalizedValue === 'true' || normalizedValue === '1') {
        return true;
      } else if (normalizedValue === 'false' || normalizedValue === '0') {
        return false;
      } else {
        // Si el valor no coincide con ninguno de los esperados, se considera false
        return false;
      }
    }

    return false;
  }

  updateItem(): void {
    this.startLoading();

    const item = {
      festive: this.festive,
      monday: this.monday,
      tuesday: this.tuesday,
      wednesday: this.wednesday,
      thursday: this.thursday,
      friday: this.friday,
      saturday: this.saturday,
      sunday: this.sunday,
    };

    this._locationsRoutesService
      .putLocation(this.id, item)
      .subscribe({
        next: (data: any) => {

          this._messageService.add({
            severity: 'success',
            summary: 'success',
            detail: 'modificado correctamente',
            life: 3000,
          });

          this.stopLoading();
          // this._router.navigate(['/locations']);
        },
        error: (error: any) => {
          this.stopLoading();
          this._messageService.add({
            severity: 'error',
            summary: JSON.stringify(error),
            life: 3000,
          });
        },
        complete: () => {},
      });
  }

  getLocationByLocationsRoutesId(id: string): void {
    this.startLoading();

    this.id = id;

    this._locationsRoutesService.getLocationByLocationsRoutesId(id).subscribe({
      next: (data: any) => {

        this.monday = this.parseBoolean(data.monday);
        this.tuesday = this.parseBoolean(data.tuesday);
        this.wednesday = this.parseBoolean(data.wednesday);
        this.thursday = this.parseBoolean(data.thursday);
        this.friday = this.parseBoolean(data.friday);
        this.saturday = this.parseBoolean(data.saturday);
        this.sunday = this.parseBoolean(data.sunday);
        this.festive = this.parseBoolean(data.festive);

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
      complete: () => {},
    });
  }

}
