import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [
    {
      id: 1,
      name: 'Torta de Frutas',
      description: 'Delicioso pastel esponjoso con frutas frescas y crema batida.',
      price: 35000,
      image: '/images/torta_frutas.png',
      category: 'Pasteles',
      rating: 5
    },
    {
      id: 2,
      name: 'Rollo de Canela',
      description: 'Clásicos rollos de canela con glaseado dulce pack x 6.',
      price: 20000,
      image: '/images/rollo_canela.png',
      category: 'Rollos de Canela',
      rating: 4.5
    },
    {
      id: 3,
      name: 'Torta de Corazón',
      description: 'Torta especial con forma de corazón y decoraciones románticas.',
      price: 36000,
      image: '/images/torta_corazon.png',
      category: 'Tortas',
      rating: 4.8
    },
    {
      id: 4,
      name: 'Red Velvet Cake',
      description: 'Clásico pastel Red Velvet con glaseado de queso crema.',
      price: 22000,
      image: '/images/red_velvet.png',
      category: 'Tortas',
      rating: 4.7
    },
    {
      id: 5,
      name: 'Galletas Decoradas',
      description: 'Set de galletas decoradas a mano para cualquier ocasión especial.',
      price: 15000,
      image: '/images/galletas_decoradas.png',
      category: 'Galletas',
      rating: 4.9
    }
  ];

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getFeaturedProducts(): Observable<Product[]> {
    return of(this.products); // Show all products in carousel
  }
}
