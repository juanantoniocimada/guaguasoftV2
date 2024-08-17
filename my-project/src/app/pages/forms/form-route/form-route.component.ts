import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { LoaderService } from '../../../services/loader.service';
import { RouteService } from '../../../services/route.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';


@Component({
  selector: 'app-form-route',
  standalone: true,
  imports: [
    ButtonModule,
    FloatLabelModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputTextModule
  ],
  providers:[
    RouteService,
    MessageService,
    ConfirmationService,
    LoaderService
  ],
  templateUrl: './form-route.component.html',
  styleUrl: './form-route.component.scss'
})
export class FormRouteComponent {

  private _loaderService= inject(LoaderService);
  private _itemService  =inject(RouteService);
  private _messageService= inject(MessageService);
  private _router= inject(Router) ;

  public number!: number;
  public description = '';

  startLoading() {
    this._loaderService.showIndeterminate();
  }

  stopLoading() {
    this._loaderService.hideLoader();
  }

  createItem(): void {
    this.startLoading();

    const item = {
      number: this.number,
      description: this.description
    };

    this._itemService.createItem(item).subscribe({
      next: (data: any) => {

        this.stopLoading();
        this._router.navigate(['/lines']);

      },
      error: (error: any) => {
        this.stopLoading();
        this._messageService.add({ severity: 'error', summary: 'QWE', detail: 'Error en la llamada', life: 3000 });
      },
      complete: () => { }
    });
  }


  updateItem(): void {
    this.startLoading();

    // this.route

    const item = {
      number: this.number,
      description: this.description
    };

    this._itemService.updateItem(12, item).subscribe({
      next: (data: any) => {

        this.stopLoading();
        this._router.navigate(['/lines']);

      },
      error: (error: any) => {
        this.stopLoading();
        this._messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Error en la llamada', life: 3000 });
      },
      complete: () => { }
    });
  }
}
