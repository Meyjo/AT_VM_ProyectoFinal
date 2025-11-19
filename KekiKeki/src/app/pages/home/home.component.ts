import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { AccordionModule } from 'primeng/accordion';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ButtonModule, CarouselModule, TagModule, AccordionModule, ToastModule],
  providers: [MessageService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  responsiveOptions: any[] | undefined;
  faqs = [
    {
      question: '¿Hacen envíos a domicilio?',
      answer: 'Sí, realizamos envíos dentro de la ciudad, Pasto - Nariño. El costo depende de la zona de entrega.'
    },
    {
      question: '¿Puedo personalizar mi pastel?',
      answer: '¡Por supuesto! Aceptamos pedidos personalizados con al menos 72 horas de anticipación (3 días).'
    },
    {
      question: '¿Tienen opciones sin gluten?',
      answer: 'Sí, contamos con una selección de postres sin gluten y sin azúcar. Puedes consultar nuestro menú especial.'
    },
    {
      question: '¿Cuáles son los métodos de pago?',
      answer: 'Aceptamos efectivo, transferencias a nequi o a través de Bre-b.'
    },
    {
      question: '¿Cómo puedo hacer un pedido?',
      answer: 'Puedes hacer tu pedido a través de nuestro sitio web, para más información directamente por WhatsApp o Instagram.'
    },
    {
      question: '¿Tienen descuentos para pedidos grandes?',
      answer: 'Sí, ofrecemos descuentos para pedidos grandes. Por favor, contáctanos para más detalles.'
    },
    {
      question: '¿Tienen tienda física?',
      answer: 'Actualmente no contamos con una tienda física, pero puedes hacer tus pedidos en línea y recibirlos en la comodidad de tu hogar.'
    }
  ];

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.productService.getFeaturedProducts().subscribe((products) => {
      this.products = products;
    });

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  goToMenu() {
    this.router.navigate(['/menu']);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.messageService.add({ severity: 'success', summary: 'Agregado', detail: product.name + ' agregado al carrito' });
  }
}
