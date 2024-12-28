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

  loaderService= inject(LoaderService);
  private _sidebarService= inject(SidebarService);

  sidebarVisible$ = this._sidebarService.getSidebarVisibility();

  public mode = 'determinate';
  private _router= inject(Router);
  public sidebarVisible: boolean = false;

  constructor() {
    this.loaderService.loaderState$.subscribe((state) => {
      this.mode = state;
    });
  }

  public navigate(path: string) {
    this._router.navigate([path]);
  }

  public logout() {

  }

  public toggleSidebar() {
    this._sidebarService.toggleSidebar(true);
  }
}
