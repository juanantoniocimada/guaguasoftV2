import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RouteService } from '../services/route.service';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    DropdownModule,
    HttpClientModule
  ],
  providers:[
    RouteService,
    MessageService,
    ConfirmationService
  ],
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.scss'
})
export class RoutesComponent implements OnInit {

  mode = 'determinate';

  routes: any[] = [];
  route: any;

  constructor(
    private itemService: RouteService,
    private router: Router,
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

  confirm() {


    this.confirmationService.confirm({
        header: `Borrar`,
        message: '¿Quieres borrar la hora?.',
        acceptIcon: 'pi pi-check mr-2',
        rejectIcon: 'pi pi-times mr-2',
        rejectButtonStyleClass: 'p-button-sm',
        acceptButtonStyleClass: 'p-button-outlined p-button-sm',
        accept: () => {

        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'no se ha podido borrar', life: 3000 });
        }
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

  getRoutes(): void {
    this.startLoading();

    this.itemService.getAllItems().subscribe({
      next: (data: any) => {
        this.stopLoading();
        this.routes = data;

      },
      error: (error: any) => {

        this.stopLoading();
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Error en la llamada', life: 3000 });

      },
      complete: () => { }
    });
  }

}
