import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarModule, ButtonModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  sidebarVisible!: boolean;

  private _router= inject(Router);

  constructor(private sidebarService: SidebarService) {
    this.sidebarService.getSidebarVisibility().subscribe((visible) => {
      this.sidebarVisible = visible;
    });
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar(false);
  }

  navigate(path: string) {
    this._router.navigate([path]);
    this.toggleSidebar();
  }

}
