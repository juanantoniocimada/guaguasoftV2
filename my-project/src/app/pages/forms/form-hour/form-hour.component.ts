import { Component, inject } from '@angular/core';
import { LoaderService } from '../../../services/loader.service';
import { RouteService } from '../../../services/route.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { HourService } from '../../../services/hour.service';
import { CheckboxModule } from 'primeng/checkbox';
import { log } from 'console';

@Component({
  selector: 'app-form-hour',
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
  ],
  providers:[
    RouteService,
    MessageService,
    ConfirmationService,
    LoaderService,
    HourService
  ],
  templateUrl: './form-hour.component.html',
  styleUrl: './form-hour.component.scss'
})
export class FormHourComponent {

  private _loaderService= inject(LoaderService);
  private _messageService= inject(MessageService);
  private _router= inject(Router) ;
  private _activatedRoute= inject(ActivatedRoute) ;

  private _routeService  =inject(RouteService);
  private _hourService  =inject(HourService);

  public festive : boolean = false;
  public monday : boolean = false;
  public tuesday : boolean = false;
  public wednesday : boolean = false;
  public thursday : boolean = false;
  public friday : boolean = false;
  public saturday : boolean = false;
  public sunday : boolean = false;

  routes: any[] = [];
  route: any;

  hours: any[] = [];
  hour: any;

  public customHour = "11:11:11";

  showCustomHour: boolean =false;

  public edit!: boolean;
  public id!: string;

  ngOnInit(): void {

    this._activatedRoute.queryParams.subscribe(params => {

      this.edit = this.parseBoolean(params['edit']);
      this.id = params['id'];

      console.log(params);

/*       {
        "value": "05:15:00",
        "id": "16",
        "routes_id": "20",
        "hours_id": "42",
        "monday": "1",
        "tuesday": "1",
        "wednesday": "1",
        "thursday": "1",
        "friday": "1",
        "saturday": "1",
        "sunday": "1",
        "festive": "1",
        "description": "Puerto del Rosario – Gran Tarajal",
        "number": "16"
    } */

      if(this.edit) {
        this.getHourByHoursRoutesId(params['id'], params)
      }
    });

    this.getRoutes();
    this.getHours();

  }

  parseBoolean(value: string): boolean {
    // Convertir a minúsculas y eliminar espacios en blanco
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

  getHourByHoursRoutesId(id: string, params: any): void {
    this.startLoading();

    this._routeService.getHourByHoursRoutesId(id).subscribe({
      next: (data: any) => {


        this.festive = this.parseBoolean(data.festive);
        this.monday = this.parseBoolean(data.monday);
        this.tuesday = this.parseBoolean(data.tuesday);
        this.wednesday = this.parseBoolean(data.wednesday);
        this.thursday = this.parseBoolean(data.thursday);
        this.friday = this.parseBoolean(data.friday);
        this.saturday = this.parseBoolean(data.saturday);
        this.sunday = this.parseBoolean(data.sunday);

        console.log(data);

        this.route = {
          id: data.routes_id,
          number: data.number,
          description: data.description,
          internal_name: ""
        };
        this.hour = {
          id: data.hours_id,
          value: data.value
        };

        this.stopLoading();
      },
      error: (error: any) => {
        this.stopLoading();
        this._messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Error en la llamada', life: 3000 });
      },
      complete: () => { }
    });
  }


  startLoading() {
    this._loaderService.showIndeterminate();
  }

  stopLoading() {
    this._loaderService.hideLoader();
  }

  getHours() {

    this.startLoading();

    this._hourService.getAllItems().subscribe({
      next: (data: any) => {
        this.hours = data;
        this.stopLoading();
      },
      error: (error: any) => {

        this.stopLoading();
        this._messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Error en la llamada', life: 3000 });

      },
      complete: () => { }
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
      sunday: this.sunday
    };

    this._routeService.putHour(this.route.id, this.hour.id, item).subscribe({
      next: (data: any) => {

        this.stopLoading();
        this._router.navigate(['/hours']);

      },
      error: (error: any) => {
        this.stopLoading();
        this._messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Error en la llamada', life: 3000 });
      },
      complete: () => { }
    });
  }

  addCustomHour(): void {
    this.startLoading();

    const item = {
      value: this.customHour
    };

    this._hourService.createItem(item).subscribe({
      next: (data: any) => {

        this.getHours();
        this.showCustomHour = false;
        this.stopLoading();

      },
      error: (error: any) => {
        this._messageService.add({ severity: 'error', summary: 'QWE', detail: 'Error en la llamada', life: 3000 });
        this.stopLoading();
      },
      complete: () => { }
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
      sunday: this.sunday
    };

    this._routeService.postHour(this.route.id, this.hour.id, item).subscribe({
      next: (data: any) => {

        this.stopLoading();
        this._router.navigate(['/hours']);

      },
      error: (error: any) => {
        this.stopLoading();
        this._messageService.add({ severity: 'error', summary: 'QWE', detail: 'Error en la llamada', life: 3000 });
      },
      complete: () => { }
    });
  }


}
