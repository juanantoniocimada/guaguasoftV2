import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SidebarService } from '../../services/sidebar.service';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    ProgressBarModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  sidebarVisible$ = this.sidebarService.getSidebarVisibility();

  mode = 'determinate';

  constructor(private loaderService: LoaderService,
    private sidebarService: SidebarService
  ) {
    // Suscribirse al estado del loader y actualizar `mode`
    this.loaderService.loaderState$.subscribe((state) => {

      console.log(state);


      this.mode = state;
    });
  }

  private _router= inject(Router);

  sidebarVisible: boolean = false;

  navigate(path: string) {
    this._router.navigate([path]);
  }

  logout() {

  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar(true);
  }

}
