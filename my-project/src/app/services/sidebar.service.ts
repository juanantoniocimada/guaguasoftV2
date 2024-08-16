import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private sidebarVisible = new BehaviorSubject<boolean>(false);

  toggleSidebar(value: boolean) {
    this.sidebarVisible.next(value);
  }

  getSidebarVisibility() {
    return this.sidebarVisible.asObservable();
  }
}
