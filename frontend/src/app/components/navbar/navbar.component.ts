import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { OrderService } from '../../services/order.service';
import { Toast } from 'primeng/toast';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, ButtonModule, DrawerModule, BadgeModule, CommonModule, ConfirmDialogModule, Toast, ReactiveFormsModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  cartVisible: boolean = false;
  orderForm = new FormGroup({
    name: new FormControl('', { nonNullable:true, validators: [Validators.required] }),
    address: new FormControl('', { nonNullable:true, validators: [Validators.required] }),
    phone: new FormControl('', { nonNullable:true, validators: [Validators.required, Validators.maxLength(10)] })
  })

  constructor(private router: Router, public cartService: CartService, private confirmationService: ConfirmationService, private orderService: OrderService, private messageService: MessageService) {}

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

  
  checkout() {
    const total = this.cartService.totalPrice()
    this.orderService.newOrder({...this.orderForm.getRawValue(), total}).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Pedido agregado correctamente',
          life: 3000
        })
        this.cartService.clearCart()
      },
      error: (err) => {this.messageService.add({
          severity: 'success',
          summary: 'Error',
          detail: 'Error al agregar pedido',
          life: 3000
        })
      }
    })
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
