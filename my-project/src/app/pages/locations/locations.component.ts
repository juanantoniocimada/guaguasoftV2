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
import { StepsModule } from 'primeng/steps';
import { log } from 'console';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-locations',
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
    StepsModule,
    HttpClientModule
  ],
  providers:[
    HourService,
    RouteService,
    MessageService,
    ConfirmationService
  ],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.scss'
})
export class LocationsComponent {

  routes: any[] = [];
  route: any;

  activeIndex: number = 0;

  locations: any[] = [

  ];

  location: any = {};


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

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
    this.location =
    this.locations[event]

  }

  getLocations(idRoute: any) {

    this.mode = 'indeterminate';


    this.routeService.getLocationsByRoute(idRoute).subscribe({
      next: (data: any) => {
        console.log(data);
        this.locations = data;
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

  onOptionChange(event: any): void {

    console.log('Description:', event.value.id);

    this.getLocations(event.value.id)
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
