import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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


  hours: any[] = [

  ];


  mode = 'determinate';

  /*
    indeterminate
    determinate
  */

  constructor(
    private routeService: RouteService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private loaderService: LoaderService

  ) {

  }

  ngOnInit(): void {
    this.getRoutes();
  }

  add() {

  }

  confirm(hour: any) {

    console.log(hour);

    this.confirmationService.confirm({
        header: `Borrar ${hour.value} de la linea nº ${hour.number}`,
        message: '¿Quieres borrar la hora?.',
        acceptIcon: 'pi pi-check mr-2',
        rejectIcon: 'pi pi-times mr-2',
        rejectButtonStyleClass: 'p-button-sm',
        acceptButtonStyleClass: 'p-button-outlined p-button-sm',
        accept: () => {
          this.deleteHour(hour.routes_id, hour.hours_id);
          this.getHours(hour.routes_id)
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'no se ha podido borrar', life: 3000 });
        }
    });
  }

  onOptionChange(event: any): void {

    console.log('Description:', event.value.id);

    this.getHours(event.value.id)
  }

  deleteHour(routeId: string, hourId: string) {

    this.startLoading();

    this.routeService.deleteHour(routeId, hourId).subscribe({
      next: (data: any) => {

        this.stopLoading();

        this.messageService.add({ severity: 'success', summary: 'Rejected', detail: 'Borrado correctamente', life: 3000 });

      },
      error: (error: any) => {
        this.stopLoading();
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Error en la llamada', life: 3000 });
      },
      complete: () => { }
    });
  }

  // Ejemplo de cómo mostrar el loader
  startLoading() {
    this.loaderService.showIndeterminate();
  }

  // Ejemplo de cómo ocultar el loader
  stopLoading() {
    this.loaderService.hideLoader();
  }

  getHours(idRoute: any) {

    this.startLoading();

    this.routeService.getHoursByRoute(idRoute).subscribe({
      next: (data: any) => {
        this.hours = data;
        this.stopLoading();
      },
      error: (error: any) => {

        this.stopLoading();
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Error en la llamada', life: 3000 });

      },
      complete: () => { }
    });
  }

  getRoutes(): void {
    this.mode = 'indeterminate';

    this.routeService.getAllItems().subscribe({
      next: (data: any) => {
        this.routes = data;
        this.stopLoading();
      },
      error: (error: any) => {
        this.stopLoading();
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Error en la llamada', life: 3000 });
      },
      complete: () => { }
    });
  }

}
