
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';;
import { Product } from '../../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  // Temporary data source until Supabase integration
  private readonly products: Product[] = [];

  // Get all published products
  getProducts(): Observable<Product[]> {
    return of(
      this.products.filter(product => product.isPublished)
    );
  }

  // Get products by category
  getProductsByCategory(category: string): Observable<Product[]> {
    return of(
      this.products.filter(product =>
        product.isPublished &&
        product.category === category
      )
    );
  }


  // // Temporary API failure simulation 
  // getProductsByCategory(category: string): Observable<Product[]> {
  //   return throwError(() => new Error('Simulated API failure'));
  // }


  // Get products by category and subcategory
  getProductsBySubcategory(
    category: string,
    subcategory: string
  ): Observable<Product[]> {
    return of(
      this.products.filter(product =>
        product.isPublished &&
        product.category === category &&
        product.subcategory === subcategory
      )
    );
  }

  // Get individual product by slug
  getProductBySlug(slug: string): Observable<Product | null> {
    return of(
      this.products.find(product =>
        product.isPublished &&
        product.slug === slug
      ) ?? null
    );
  }

  // Search published products
  searchProducts(query: string): Observable<Product[]> {
    const searchTerm = query.trim().toLowerCase();

    return of(
      this.products.filter(product =>
        product.isPublished &&
        (
          product.name.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm) ||
          product.subcategory?.toLowerCase().includes(searchTerm) ||
          product.description?.toLowerCase().includes(searchTerm)
        )
      )
    );
  }
}
