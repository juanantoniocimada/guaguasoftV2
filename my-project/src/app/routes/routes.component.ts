import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RouteService } from '../services/route.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    ProgressBarModule,
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
    private messageService: MessageService
  ) {

  }

  ngOnInit(): void {
    this.getRoutes();
  }

  getRoutes(): void {
    this.mode = 'indeterminate';

    this.itemService.getAllItems().subscribe({
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
