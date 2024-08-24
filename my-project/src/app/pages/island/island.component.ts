import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { IslandService } from '../../services/island.service';
import { HttpClientModule } from '@angular/common/http';
import { LoaderService } from '../../services/loader.service';
import { TitleComponent } from "../../components/title/title.component";

@Component({
  selector: 'app-island',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    HttpClientModule,
    TitleComponent
],
  providers:[
    IslandService,
  ],
  templateUrl: './island.component.html',
  styleUrl: './island.component.scss'
})
export class IslandComponent implements OnInit {

  island: any

  id: string | undefined;
  name: string | undefined;

  private _itemService= inject(IslandService) ;
  private _router= inject(Router) ;
  private _route= inject(ActivatedRoute) ;
  private _loaderService= inject(LoaderService) ;

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {

        const id = params.get('id');
        if (id) {
          this.getIslandById(id)
        }

    });
  }

  getIslandById(id: string): void {

    this.startLoading();

    this._itemService.getItemById(id).subscribe((data: any) => {
      this.island = data;


      this.id = this.island.island_id
      this.name = this.island.name

      this.stopLoading();

    });
  }

  startLoading() {
    this._loaderService.showIndeterminate();
  }

  stopLoading() {
    this._loaderService.hideLoader();
  }

  addIsland(): void {

    this.startLoading();

    const newIsland = {
      name: this.name
    }

    this._itemService.createItem(newIsland).subscribe((data: any) => {

      this.stopLoading();

      this._router.navigate(['/islands']);

    });
  }

  updateIsland(id: number): void {

    this.startLoading();


    const newIsland = {
      name: this.name
    }

    this._itemService.updateItem(id, newIsland).subscribe((data: any) => {
      this.stopLoading();
      this._router.navigate(['/islands']);
    });
  }
}
