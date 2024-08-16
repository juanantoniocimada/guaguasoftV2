import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loaderState = new BehaviorSubject<'indeterminate' | 'determinate'>('determinate');

  // Observable para suscribirse al estado del loader
  loaderState$ = this.loaderState.asObservable();

  // Método para cambiar el estado del loader
  setLoaderState(state: 'indeterminate' | 'determinate') {
    this.loaderState.next(state);
  }

  // Métodos específicos para facilitar su uso
  showIndeterminate() {
    this.setLoaderState('indeterminate');
  }

  hideLoader() {
    this.setLoaderState('determinate');
  }
}
