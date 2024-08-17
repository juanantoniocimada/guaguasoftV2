import { Component, OnInit, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { IslandService } from '../../services/island.service';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HttpClientModule } from '@angular/common/http';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-islands',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    HttpClientModule,

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

  loaderState$ = this._loaderService.loaderState$;

  products: any[] = [];

  islands: any[] = [];
  island: any;

  private _itemService=  inject(IslandService);
  private _router=  inject(Router);
  private _confirmationService=  inject(ConfirmationService);
  private _messageService=  inject(MessageService);

  constructor(private _loaderService:LoaderService) {

  }

  ngOnInit(): void {
    this.getAllIslands();
  }

  startLoading() {
    this._loaderService.showIndeterminate();
  }

  stopLoading() {
    this._loaderService.hideLoader();
  }

  navigate(path: string, id?: number): void {
    // Si id está definido, navega a la ruta con el id
    if (id !== undefined) {
      this._router.navigate([path, id]);
    } else {
      // Navega solo a la ruta sin id
      this._router.navigate([path]);
    }
  }

  getAllIslands(): void {

    this.startLoading();

    this._itemService.getAllItems().subscribe({
      next: (data: any) => {
        console.log(data);
        this.islands = data;
        this.stopLoading();
      },
      error: (error) => {
        this.stopLoading();
        this._messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Error en la llamada', life: 3000 });

      },
      complete: () => { }
    });
  }

  confirm(id: number) {
    this._confirmationService.confirm({
      header: `Borrar ${id}`,
      accept: () => {
        this.deleteIsland(id);
      },
      reject: () => {
          this._messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }

  deleteIsland(id: number): void {
    this._itemService.deleteItem(id).subscribe(() => {
      this.islands = this.islands.filter(island => island.id !== id);

      this.getAllIslands();
      this.show();

    });
  }

  show() {
    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }
}
