import { Component, OnInit, inject } from '@angular/core';
import { IslandService } from '../../../services/island.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
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

  private itemService=  inject(IslandService);
  private router=  inject(Router);
  private route=  inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.getIslandById(id)
      }
    });
  }

  getIslandById(id: string): void {

    this.itemService.getItemById(id).subscribe((data: any) => {
      this.island = data;

      this.id = this.island.island_id
      this.name = this.island.name

    });
  }

  addIsland(): void {

    const newIsland = {
      name: this.name
    }

    this.itemService.createItem(newIsland).subscribe((data: any) => {
        console.log(data);

        this.router.navigate(['/islands']);

    });
  }

  updateIsland(id: number): void {

    const newIsland = {
      name: this.name
    }

    this.itemService.updateItem(id, newIsland).subscribe((data: any) => {
      this.router.navigate(['/islands']);
    });
  }

}
