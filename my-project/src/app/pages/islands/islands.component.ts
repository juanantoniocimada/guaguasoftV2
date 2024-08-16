import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { IslandService } from '../../services/island.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-islands',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    ProgressBarModule,
    ToastModule,
    ConfirmDialogModule,
    HttpClientModule
  ],
  providers:[
    IslandService,
    MessageService,
    ConfirmationService
  ],
  templateUrl: './islands.component.html',
  styleUrl: './islands.component.scss'
})
export class IslandsComponent implements OnInit {

  products: any[] = [];

  islands: any[] = [];
  island: any;

  mode = 'determinate';

  /*
    indeterminate
    determinate
  */

  constructor(private itemService: IslandService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {

  }


  ngOnInit(): void {
    this.getAllIslands();
  }

  navigate(path: string, id?: number): void {
    // Si id está definido, navega a la ruta con el id
    if (id !== undefined) {
      this.router.navigate([path, id]);
    } else {
      // Navega solo a la ruta sin id
      this.router.navigate([path]);
    }
  }

  getAllIslands(): void {

    this.mode = 'indeterminate';

    this.itemService.getAllItems().subscribe({
      next: (data: any) => {
        console.log(data);
        this.islands = data;
        this.mode = 'determinate';

      },
      error: (error) => {
        console.error('Error fetching islands:', error);
        // this.errorMessage = 'Failed to load islands. Please try again later.';
        this.mode = 'determinate';
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Error en la llamada', life: 3000 });

      },
      complete: () => {
        console.log('Fetch islands request completed');
        this.mode = 'determinate';

      }
    });
  }

  confirm(id: number) {
    this.confirmationService.confirm({
        header: `Borrar ${id}`,
        message: '¿Quieres borrar la isla?.',
        acceptIcon: 'pi pi-check mr-2',
        rejectIcon: 'pi pi-times mr-2',
        rejectButtonStyleClass: 'p-button-sm',
        acceptButtonStyleClass: 'p-button-outlined p-button-sm',
        accept: () => {
          this.deleteIsland(id);
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
}

  // Borrar una isla
  deleteIsland(id: number): void {
    this.itemService.deleteItem(id).subscribe(() => {
      this.islands = this.islands.filter(island => island.id !== id);

      this.getAllIslands();

      this.show();

    });
  }

  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }
}
