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

  private _loaderService= inject(LoaderService);
  private _sidebarService= inject(SidebarService);

  sidebarVisible$ = this._sidebarService.getSidebarVisibility();

  mode = 'determinate';

  constructor() {
    this._loaderService.loaderState$.subscribe((state) => {
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
    this._sidebarService.toggleSidebar(true);
  }
}
