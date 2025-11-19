import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, ButtonModule, DrawerModule, BadgeModule, CommonModule, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  cartVisible: boolean = false;

  constructor(private router: Router, public cartService: CartService, private confirmationService: ConfirmationService) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        routerLink: '/'
      },
      {
        label: 'Menú',
        icon: 'pi pi-list',
        routerLink: '/menu'
      },
      {
        label: 'Contacto',
        icon: 'pi pi-envelope',
        routerLink: '/contact'
      }
    ];
  }

  goHome() {
    this.router.navigate(['/']);
  }

  goToMenu() {
    this.cartVisible = false;
    this.router.navigate(['/menu']);
  }

  confirmClearCart() {
    this.confirmationService.confirm({
      message: '¿Vaciar todo el carrito?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, vaciar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => this.cartService.clearCart()
    });
  }

  increase(itemId: number) {
    this.cartService.increaseQuantity(itemId);
  }

  decrease(itemId: number) {
    this.cartService.decreaseQuantity(itemId);
  }
}
