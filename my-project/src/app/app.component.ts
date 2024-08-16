import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, FormsModule, SidebarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  sidebarVisible: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {


  }

  navigate(path: string) {
    this.router.navigate([path]);
    // this.router.navigate(['/loc']);
  }

  logout() {

  }


}
