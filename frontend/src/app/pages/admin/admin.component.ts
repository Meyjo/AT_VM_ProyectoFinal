import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TabViewModule } from 'primeng/tabview';
import { Product } from '../../models/product.model';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputTextarea,
    InputNumberModule,
    ToolbarModule,
    ToastModule,
    ConfirmDialogModule,
    TabViewModule,
    ReactiveFormsModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  products: any[] = [];
  productDialog: boolean = false;
  product!: any;
  selectedProducts!: any;
  submitted: boolean = false;
  creationForm = new FormGroup({
    name: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    description: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    category: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    price: new FormControl(0, {nonNullable: true, validators: [Validators.required]}),
    image: new FormControl('', {nonNullable: true})
  })

  // Mock orders for visualization
  orders: any[] = [];

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private productService: ProductService, private ordersService: OrderService) {
    // Mock data for products
    this.productService.getProducts();
  }

  ngOnInit(): void {
    this.loadProducts()
    this.loadOrders()
  }

  openNew() {
    this.product = { id: 0, name: '', description: '', price: 0, image: '', category: '' };
    this.submitted = false;
    this.productDialog = true;
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: any) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar ' + product.name + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(product.id).subscribe({
          next: (res) => {
            this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Producto Eliminado', life: 3000 });
            this.loadProducts()
          }
        })
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.products = res.products
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  loadOrders() {
    this.ordersService.getOrders().subscribe({
      next: (res) => {
        this.orders = res.orders
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar los pedidos',
          life: 5000
        })
      }
    })
  }


  saveProduct() {
    if(this.creationForm.valid) {
      let data = {...this.creationForm.getRawValue()}
      if(data.image === '') {
        data.image = 'https://static.vecteezy.com/system/resources/previews/024/983/914/original/simple-user-default-icon-free-png.png'
      }
      this.productService.newProduct(data).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Producto agregado correctamente',
            life: 5000
          })
          this.productDialog = false;
          this.loadProducts()
        }
      })
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El formulario de creación no es válido',
        life: 5000
      })
    }

  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  createId(): number {
    return Math.floor(Math.random() * 10000);
  }
}
