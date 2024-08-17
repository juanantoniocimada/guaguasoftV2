import { Component, OnInit, inject } from '@angular/core';
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
import { HttpClientModule } from '@angular/common/http';
import { LoaderService } from '../../services/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hours',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    FormsModule,
    DropdownModule,
    CommonModule,
    HttpClientModule
  ],
  providers:[
    HourService,
    RouteService,
    MessageService,
    ConfirmationService
  ],
  templateUrl: './hours.component.html',
  styleUrl: './hours.component.scss'
})
export class HoursComponent implements OnInit {

  routes: any[] = [];
  route: any;

  hours: any[] = [];

  private _routeService= inject(RouteService);
  private _confirmationService= inject(ConfirmationService);
  private _messageService= inject(MessageService);
  private _loaderService= inject(LoaderService);
  private _router= inject(Router) ;

  ngOnInit(): void {
    this.getRoutes();
  }

  confirm(hour: any) {

    this._confirmationService.confirm({
        header: `Borrar`,
        accept: () => {
          this.deleteHour(hour.routes_id, hour.hours_id);
          this.getHours(hour.routes_id)
        },
        reject: () => {
            this._messageService.add({ severity: 'error', summary: 'Rejected', detail: 'no se ha podido borrar', life: 3000 });
        }
    });
  }

  onOptionChange(event: any): void {
    this.getHours(event.value.id)
  }

  deleteHour(routeId: string, hourId: string) {

    this.startLoading();

    this._routeService.deleteHour(routeId, hourId).subscribe({
      next: (data: any) => {

        this.stopLoading();

        this._messageService.add({ severity: 'success', summary: 'Rejected', detail: 'Borrado correctamente', life: 3000 });

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

  add() {
    this._router.navigate(['/form-hour'], { queryParams: { edit: false, id: 0 } });
  }

  edit(hour: any) {
    this._router.navigate(['/form-hour'], { queryParams: { edit: true, id: hour.id } });
  }

  getHours(idRoute: any) {

    this.startLoading();

    this._routeService.getHoursByRoute(idRoute).subscribe({
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
