import { Component, inject, OnInit } from '@angular/core';
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
import { HoursRoutesService } from '../../../services/hours-routes.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FooterComponent } from "../../../components/footer/footer.component";
import { TitleComponent } from "../../../components/title/title.component";

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
    ToastModule,
    ConfirmDialogModule,
    FooterComponent,
    TitleComponent
],
  providers:[
    RouteService,
    MessageService,
    ConfirmationService,
    LoaderService,
    HourService,
    HoursRoutesService
  ],
  templateUrl: './form-hour.component.html',
  styleUrl: './form-hour.component.scss'
})
export class FormHourComponent implements OnInit {

  private _loaderService= inject(LoaderService);
  private _messageService= inject(MessageService);
  private _router= inject(Router) ;
  private _activatedRoute= inject(ActivatedRoute) ;
  private _routeService  =inject(RouteService);
  private _hourService  =inject(HourService);
  private _hoursRoutesService  =inject(HoursRoutesService);

  public festive : boolean = false;
  public monday : boolean = false;
  public tuesday : boolean = false;
  public wednesday : boolean = false;
  public thursday : boolean = false;
  public friday : boolean = false;
  public saturday : boolean = false;
  public sunday : boolean = false;

  ctaButtons = [
    { text: 'create Item', action: () => this.createItem() },
    { text: 'update Item', action: () => this.updateItem() }
  ];

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

      if(this.edit) {
        this.getHourByHoursRoutesId(params['id'])
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
        this._messageService.add({
          severity: 'error',
          summary: JSON.stringify(error),
          life: 3000,
        });
      },
      complete: () => { }
    });
  }

  getHourByHoursRoutesId(id: string): void {
    this.startLoading();

    console.log(id);


    this._hoursRoutesService.getHourByHoursRoutesId(id).subscribe({
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
          id_routes: data.id_routes,
          number: data.number,
          description: data.description,
          internal_name: "",
          color: "#ABB2B9"
        };

        this.hour = {
          id_hours: data.id_hours,
          value: data.value
        };

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


  public startLoading() {
    this._loaderService.showIndeterminate();
  }

  public stopLoading() {
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
        this._messageService.add({
          severity: 'error',
          summary: JSON.stringify(error),
          life: 3000,
        });

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

    this._hoursRoutesService.putHour(this.route.id, this.hour.id, item).subscribe({
      next: (data: any) => {

        this.stopLoading();
        this._router.navigate(['/hours']);

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

  toggleCustomHour() {
    this.showCustomHour = !this.showCustomHour;
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
        this._messageService.add({ severity: 'success', summary: 'success', detail: data.value, life: 3000 });

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

    this._hoursRoutesService.postHour(this.route.id_routes, this.hour.id_hours, item).subscribe({
      next: (data: any) => {

        this.stopLoading();
        this._router.navigate(['/hours']);

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
