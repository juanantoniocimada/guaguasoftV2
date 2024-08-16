import { Component, OnInit } from '@angular/core';
import { IslandService } from '../../services/island.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HourService } from '../../services/hour.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { RouteService } from '../../services/route.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-hours',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    ProgressBarModule,
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
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
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

    this.mode = 'indeterminate';

    this.routeService.deleteHour(routeId, hourId).subscribe({
      next: (data: any) => {
        console.log(data);
        // this.hours = data;
        this.mode = 'determinate';

        this.messageService.add({ severity: 'success', summary: 'Rejected', detail: 'Borrado correctamente', life: 3000 });

      },
      error: (error: any) => {
        this.mode = 'determinate';

        console.error('Error fetching routes:', error);
        // this.errorMessage = 'Failed to load islands. Please try again later.';
        this.mode = 'determinate';
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Error en la llamada', life: 3000 });

      },
      complete: () => {
        console.log('Fetch routes request completed');
        this.mode = 'determinate';

      }
    });
  }

  getHours(idRoute: any) {

    this.mode = 'indeterminate';


    this.routeService.getHoursByRoute(idRoute).subscribe({
      next: (data: any) => {
        console.log(data);
        this.hours = data;
        this.mode = 'determinate';

      },
      error: (error: any) => {
        this.mode = 'determinate';

        console.error('Error fetching routes:', error);
        // this.errorMessage = 'Failed to load islands. Please try again later.';
        this.mode = 'determinate';
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Error en la llamada', life: 3000 });

      },
      complete: () => {
        console.log('Fetch routes request completed');
        this.mode = 'determinate';

      }
    });
  }

  getRoutes(): void {
    this.mode = 'indeterminate';

    this.routeService.getAllItems().subscribe({
      next: (data: any) => {
        console.log(data);
        this.routes = data;
        this.mode = 'determinate';

      },
      error: (error: any) => {
        console.error('Error fetching routes:', error);
        // this.errorMessage = 'Failed to load islands. Please try again later.';
        this.mode = 'determinate';
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Error en la llamada', life: 3000 });

      },
      complete: () => {
        console.log('Fetch routes request completed');
        this.mode = 'determinate';

      }
    });
  }

}
