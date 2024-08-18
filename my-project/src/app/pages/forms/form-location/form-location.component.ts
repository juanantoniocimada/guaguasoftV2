import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RouteService } from '../../../services/route.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LoaderService } from '../../../services/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../../../services/location.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { LocationsRoutesService } from '../../../services/locations-routes.service';
import { HoursRoutesService } from '../../../services/hours-routes.service';

@Component({
  selector: 'app-form-location',
  standalone: true,
  imports: [
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputTextModule,
    CommonModule,
    DropdownModule,
    CheckboxModule,
    FloatLabelModule,
  ],
  providers: [
    RouteService,
    MessageService,
    ConfirmationService,
    LoaderService,
    LocationService,
    LocationsRoutesService
  ],
  templateUrl: './form-location.component.html',
  styleUrl: './form-location.component.scss',
})
export class FormLocationComponent implements OnInit {

  private _loaderService = inject(LoaderService);
  private _messageService = inject(MessageService);
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);
  private _routeService = inject(RouteService);
  private _locationService = inject(LocationService);
  private _locationsRoutesService = inject(LocationsRoutesService);

  public festive: boolean = false;
  public monday: boolean = false;
  public tuesday: boolean = false;
  public wednesday: boolean = false;
  public thursday: boolean = false;
  public friday: boolean = false;
  public saturday: boolean = false;
  public sunday: boolean = false;
  public type: string = '';
  public position: string = '';

  routes: any[] = [];
  route: any;

  locations: any[] = [];
  location: any;

  public edit!: boolean;
  public id!: string;

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((params) => {
      this.edit = this.parseBoolean(params['edit']);
      this.id = params['id'];

      if (this.edit) {
        this.getLocationByLocationsRoutesId(params['id'], params);
      }
    });

    this.getRoutes();
    this.getLocations();
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
          summary: 'Rejected',
          detail: 'Error en la llamada',
          life: 3000,
        });
      },
      complete: () => {},
    });
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

  getLocationByLocationsRoutesId(id: string, params: any): void {
    this.startLoading();

    this._locationsRoutesService.getLocationByLocationsRoutesId(id).subscribe({
      next: (data: any) => {

        this.festive = this.parseBoolean(data.festive);
        this.monday = this.parseBoolean(data.monday);
        this.tuesday = this.parseBoolean(data.tuesday);
        this.wednesday = this.parseBoolean(data.wednesday);
        this.thursday = this.parseBoolean(data.thursday);
        this.friday = this.parseBoolean(data.friday);
        this.saturday = this.parseBoolean(data.saturday);
        this.sunday = this.parseBoolean(data.sunday);

        this.type = data.type;
        this.position = data.position;

        this.route = {
          id: data.route_id,
          number: data.number,
          description: data.routes_description,
          internal_name: data.internal_name,
        };

        this.location = {
          id: data.locations_id,
          description: data.locations_description,
          preferred_stop: data.preferred_stop,
          internal_name_tiadhe: data.internal_name_tiadhe,
          municipalities_id: data.municipalities_id,
        };

        this.stopLoading();
      },
      error: (error: any) => {
        this.stopLoading();
        this._messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'Error en la llamada',
          life: 3000,
        });
      },
      complete: () => {},
    });
  }

  startLoading() {
    this._loaderService.showIndeterminate();
  }

  stopLoading() {
    this._loaderService.hideLoader();
  }

  getLocations() {
    this.startLoading();

    this._locationService.getAllItems().subscribe({
      next: (data: any) => {

        this.locations = data;
        this.stopLoading();
      },
      error: (error: any) => {
        this.stopLoading();
        this._messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'Error en la llamada',
          life: 3000,
        });
      },
      complete: () => {},
    });
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
          this.stopLoading();
          this._router.navigate(['/locations']);
        },
        error: (error: any) => {
          this.stopLoading();
          this._messageService.add({
            severity: 'error',
            summary: 'Rejected',
            detail: 'Error en la llamada',
            life: 3000,
          });
        },
        complete: () => {},
      });
  }

  createItem(): void {
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
      locations_id: '37',
      position: this.position,
      type: this.type,
    };

    this._locationsRoutesService
      .postLocation(this.route.id, this.location.id, item)
      .subscribe({
        next: (data: any) => {
          this.stopLoading();
          this._router.navigate(['/locations']);
        },
        error: (error: any) => {
          this.stopLoading();
          this._messageService.add({
            severity: 'error',
            summary: 'QWE',
            detail: 'Error en la llamada',
            life: 3000,
          });
        },
        complete: () => {},
      });
  }
}
