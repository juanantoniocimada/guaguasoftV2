import { Routes } from '@angular/router';
import { IslandComponent } from './pages/island/island.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { RoutesComponent } from './routes/routes.component';
import { IslandsComponent } from './pages/islands/islands.component';
import { HoursComponent } from './pages/hours/hours.component';

export const routes: Routes = [
  { path: 'lines', component: RoutesComponent },

  { path: 'locations', component: LocationsComponent },

  { path: 'islands', component: IslandsComponent },
  { path: 'island/:id', component: IslandComponent },
  { path: 'island', component: IslandComponent },

  { path: 'hours', component: HoursComponent },

  { path: '', redirectTo: '/lines', pathMatch: 'full' }, // Ruta por defecto
  { path: '**', redirectTo: '/lines' } // Ruta de captura para rutas no encontradas
];
