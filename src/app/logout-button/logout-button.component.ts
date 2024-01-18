import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.css'
})
export class LogoutButtonComponent {
constructor(private keycloakService: KeycloakService) {}
  async logout() {
    try {
      await this.keycloakService.logout();
    } catch (error) {
      console.error('Logout failed', error);
    }
  }
}
