import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { IslandService } from '../../services/island.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-island',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    HttpClientModule
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

  constructor(private itemService: IslandService,
    private router: Router,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {

      console.log(params);


        const id = params.get('id');
        if (id) {
          this.getIslandById(id)
        }

    });
  }

  // Obtener una isla por ID
  getIslandById(id: string): void {



    this.itemService.getItemById(id).subscribe((data: any) => {
      this.island = data;


      this.id = this.island.island_id
      this.name = this.island.name

    });
  }

  // Agregar una nueva isla
  addIsland(): void {

    const newIsland = {
      name: this.name
    }

    this.itemService.createItem(newIsland).subscribe((data: any) => {
        console.log(data);

        this.router.navigate(['/islands']);

    });
  }

  // Actualizar una isla existente
  updateIsland(id: number): void {

    const newIsland = {
      name: this.name
    }

    this.itemService.updateItem(id, newIsland).subscribe((data: any) => {
        console.log(data);

        this.router.navigate(['/islands']);

    });
  }

}
