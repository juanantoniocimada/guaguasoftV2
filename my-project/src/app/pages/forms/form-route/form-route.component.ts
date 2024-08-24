import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { LoaderService } from '../../../services/loader.service';
import { RouteService } from '../../../services/route.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FooterComponent } from "../../../components/footer/footer.component";
import { TitleComponent } from "../../../components/title/title.component";


@Component({
  selector: 'app-form-route',
  standalone: true,
  imports: [
    ButtonModule,
    FloatLabelModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputTextModule,
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
    FooterComponent,
    TitleComponent
],
  providers:[
    RouteService,
    MessageService,
    ConfirmationService,
    LoaderService,
  ],
  templateUrl: './form-route.component.html',
  styleUrl: './form-route.component.scss'
})
export class FormRouteComponent implements OnInit {

  private _loaderService= inject(LoaderService);
  private _itemService  =inject(RouteService);
  private _messageService= inject(MessageService);
  private _router= inject(Router) ;
  private _activatedRoute= inject(ActivatedRoute) ;

  public edit!: boolean;
  public id!: string;

  public number!: number;
  public description = '';

  ngOnInit(): void {

    this._activatedRoute.queryParams.subscribe(params => {

      this.edit = this.parseBoolean(params['edit']);
      this.id = params['id'];

      if(this.edit) {
        this.getRouteById(params['id'])
      }
    });
  }

  parseBoolean(value: string): boolean {
    return value === 'true';
  }

  getRouteById(id: string): void {

    this._itemService.getItemById(id).subscribe((data: any) => {

      this.id = data.id;
      this.number = data.number;
      this.description = data.description;

    });
  }

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

        console.log(data);


        this.stopLoading();
        this._messageService.add({ severity: 'success', summary: 'success', detail: 'Operación realizada', life: 3000 });

        this._router.navigate(['/lines']);

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


  updateItem(): void {
    this.startLoading();


    const item = {
      number: this.number,
      description: this.description
    };

    this._itemService.updateItem(this.id, item).subscribe({
      next: (data: any) => {

        this.stopLoading();
        this._router.navigate(['/lines']);

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
