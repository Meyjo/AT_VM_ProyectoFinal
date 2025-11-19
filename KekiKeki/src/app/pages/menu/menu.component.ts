import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, TagModule, RatingModule, ToastModule, InputTextModule, DropdownModule],
  providers: [MessageService],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  products: Product[] = [];
  filtered: Product[] = [];
  loading: boolean = true;
  categories: { label: string; value: string }[] = [];
  selectedCategory: string | null = null;
  search: string = '';
  // simple grid layout only

  constructor(
    private productService: ProductService, 
    private cartService: CartService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.filtered = products.slice();
      const uniq = Array.from(new Set(products.map(p => p.category)));
      this.categories = uniq.map(c => ({ label: c, value: c }));
      this.loading = false;
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.messageService.add({severity:'success', summary:'Agregado', detail: product.name + ' agregado al carrito'});
  }

  applyFilters() {
    const term = (this.search || '').trim().toLowerCase();
    this.filtered = this.products.filter(p => {
      const matchesCategory = this.selectedCategory ? p.category === this.selectedCategory : true;
      const matchesSearch = term ? (p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term)) : true;
      return matchesCategory && matchesSearch;
    });
  }
}
