import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  @Input() ctaButtons: { text: string; action: () => void }[] = [];

  // Método para ejecutar la acción del botón
  handleClick(action: () => void): void {
    if (action) {
      action(); // Ejecuta la acción si está definida
    }
  }
}
