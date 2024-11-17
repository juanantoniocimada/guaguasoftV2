import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from '../../../components/footer/footer.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { TitleComponent } from '../../../components/title/title.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LoaderService } from '../../../services/loader.service';
import { HoursRoutesService } from '../../../services/hours-routes.service';
import { RouteService } from '../../../services/route.service';
import { LocationsRoutesService } from '../../../services/locations-routes.service';
import { log } from 'console';

@Component({
  selector: 'app-form-restrictions-locations-line-hour',
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
    ConfirmDialogModule,
    ToastModule,
    TitleComponent,
    FooterComponent
  ],
  providers:[
    MessageService,
    LoaderService,
    HoursRoutesService,
    ConfirmationService,
    LocationsRoutesService,
    RouteService
  ],
  templateUrl: './form-restrictions-locations-line-hour.component.html',
  styleUrl: './form-restrictions-locations-line-hour.component.scss'
})
export class FormRestrictionsLocationsLineHourComponent implements OnInit {

  ctaButtons = [
    { text: 'save', action: () => this.save() },
  ];

  routes: any[] = [];
  route: any;

  locations: any[] = [];
  location: any;

  hours: any[] = [];
  hour: any;

  public festive_enabled: boolean = false;
  public monday_enabled: boolean = false;
  public tuesday_enabled: boolean = false;
  public wednesday_enabled: boolean = false;
  public thursday_enabled: boolean = false;
  public friday_enabled: boolean = false;
  public saturday_enabled: boolean = false;
  public sunday_enabled: boolean = false;

  id_hours_routes: any;
  id_locations_routes: any;

  private _hoursRoutesService= inject(HoursRoutesService);
  private _locationsRoutesService= inject(LocationsRoutesService);
  private _messageService= inject(MessageService);
  private _loaderService= inject(LoaderService);
  private _routeService= inject(RouteService);

  ngOnInit(): void {
    this.getRoutes();
  }

  onOptionChange(event: any): void {

    this.getHours(event.value.id_routes);
    this.getLocations(event.value.id_routes);
  }

  onOptionChange2(event: any): void {

    this.id_hours_routes = event.value.id_hours_routes;
  }

  onOptionChange3(event: any): void {
    this.id_locations_routes = event.value.id_locations_routes;
  }

  save() {
    this.startLoading();

    const item = {
      fk_locations_routes: this.id_locations_routes,
      fk_hours_routes: this.id_hours_routes,
      monday_enabled: this.monday_enabled,
      tuesday_enabled: this.tuesday_enabled,
      wednesday_enabled: this.wednesday_enabled,
      thursday_enabled: this.thursday_enabled,
      friday_enabled: this.friday_enabled,
      saturday_enabled: this.saturday_enabled,
      sunday_enabled: this.sunday_enabled,
      festive_enabled: this.festive_enabled,

    };

    console.log(item);


    this._locationsRoutesService
      .post(item)
      .subscribe({
        next: (data: any) => {

          this._messageService.add({
            severity: 'success',
            summary: 'success',
            detail: 'creado correctamente',
            life: 3000,
          });

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

    this.stopLoading();
  }

  selectAll() {

    this.monday_enabled = true;
    this.tuesday_enabled = true;
    this.wednesday_enabled = true;
    this.thursday_enabled = true;
    this.friday_enabled = true;
    this.saturday_enabled = true;
    this.sunday_enabled = true;
    this.festive_enabled = true;

  }

  quitAll() {
    this.monday_enabled = false;
    this.tuesday_enabled = false;
    this.wednesday_enabled = false;
    this.thursday_enabled = false;
    this.friday_enabled = false;
    this.saturday_enabled = false;
    this.sunday_enabled = false;
    this.festive_enabled = false;
  }

  selectWeekdays() {
    this.monday_enabled = true;
    this.tuesday_enabled = true;
    this.wednesday_enabled = true;
    this.thursday_enabled = true;
    this.friday_enabled = true;
  }

  quitWeekdays() {
    this.monday_enabled = false;
    this.tuesday_enabled = false;
    this.wednesday_enabled = false;
    this.thursday_enabled = false;
    this.friday_enabled = false;
  }

  selectSundaysAndHolidays() {
    this.sunday_enabled = true;
    this.festive_enabled = true;
  }

  quitSundaysAndHolidays() {
    this.sunday_enabled = false;
    this.festive_enabled = false;
  }

  getLocations(data: any) {
    this.startLoading();

    this._locationsRoutesService.getLocationsByRoute(data).subscribe({
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

  startLoading() {
    this._loaderService.showIndeterminate();
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

  stopLoading() {
    this._loaderService.hideLoader();
  }

  getHours(idRoute: any) {

    this.startLoading();

    this._hoursRoutesService.getHoursByRoute(idRoute).subscribe({
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

}
