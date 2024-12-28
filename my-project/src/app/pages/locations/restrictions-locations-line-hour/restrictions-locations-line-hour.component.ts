import { Component, inject, OnInit } from '@angular/core';
import { RouteService } from '../../../services/route.service';
import { LoaderService } from '../../../services/loader.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LocationsRoutesService } from '../../../services/locations-routes.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { StepsModule } from 'primeng/steps';
import { HttpClientModule } from '@angular/common/http';
import { TitleComponent } from '../../../components/title/title.component';
import { HourService } from '../../../services/hour.service';
import { CheckboxModule } from 'primeng/checkbox';
import { InputIconModule } from 'primeng/inputicon';
import { FooterComponent } from '../../../components/footer/footer.component';
import { IconFieldModule } from 'primeng/iconfield';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restrictions-locations-line-hour',
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
    FooterComponent,
    InputIconModule,
    IconFieldModule
  ],
  providers:[
    HourService,
    RouteService,
    MessageService,
    ConfirmationService,
    LocationsRoutesService
  ],  templateUrl: './restrictions-locations-line-hour.component.html',
  styleUrl: './restrictions-locations-line-hour.component.scss'
})
export class RestrictionsLocationsLineHourComponent implements OnInit {


  private _routeService= inject(RouteService);
  private _loaderService= inject(LoaderService);
  private _messageService= inject(MessageService);
  private _locationsRoutesService= inject(LocationsRoutesService);
  private _router=  inject(Router);

  routes: any[] = [];
  route: any;

  locations: any[] = [];

  hours: any[] = [];

  ctaButtons = [
    {
      text: 'crear',
      icon:'pi pi-power-off',
      action: () => this.createItem()
    },
  ];

  items = [

  ]

  ngOnInit(): void {
    this.getRoutes()
  }

  createItem() {
    this._router.navigate(['/form-restrictions-locations-line-hour']);
  }

  all(item: any) {

    item.monday_enabled = true;
    item.tuesday_enabled = true;
    item.wednesday_enabled = true;
    item.thursday_enabled = true;
    item.friday_enabled = true;
    item.saturday_enabled = true;
    item.sunday_enabled = true;
    item.festive_enabled = true;

  }

  update(object: any): void {
    this.startLoading();

    const item = {
      monday_enabled: object.monday_enabled,
      tuesday_enabled: object.tuesday_enabled,
      wednesday_enabled: object.wednesday_enabled,
      thursday_enabled: object.thursday_enabled,
      friday_enabled: object.friday_enabled,
      saturday_enabled: object.saturday_enabled,
      sunday_enabled: object.sunday_enabled,
      festive_enabled: object.festive_enabled,

    };

    this._locationsRoutesService
      .putLocationItinerary(object.id_itinerary_specific_hour, item)
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

    this.stopLoading();
  }

  onOptionChange(event: any): void {
    this.get(event.value.id_routes);
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

  public startLoading() {
    this._loaderService.showIndeterminate();
  }

  public stopLoading() {
    this._loaderService.hideLoader();
  }

  get(id_routes: any): void {
    this.startLoading();

    const item = {
      id_routes: id_routes
    };

    this._locationsRoutesService.get(item).subscribe({
      next: (data: any) => {

        console.log(data);


        this.items = data.map((item: any) => ({
          ...item,
          sunday_enabled: item.sunday_enabled === "1",
          monday_enabled: item.monday_enabled === "1",
          tuesday_enabled: item.tuesday_enabled === "1",
          wednesday_enabled: item.wednesday_enabled === "1",
          thursday_enabled: item.thursday_enabled === "1",
          friday_enabled: item.friday_enabled === "1",
          saturday_enabled: item.saturday_enabled === "1",
          festive_enabled: item.festive_enabled === "1"
      }));

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
