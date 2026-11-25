
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  map,
  switchMap,
  catchError,
  startWith,
  of,
  defer,
  Observable,
  Subject,
  combineLatest,
} from 'rxjs';

import {
  Breadcrumb,
  BreadcrumbItem,
} from '../../../shared/components/breadcrumb/breadcrumb';

import { ProductCard } from '../../../shared/components/product-card/product-card';
import { ProductCardSkeleton } from '../../../shared/components/product-card-skeleton/product-card-skeleton';

import { Product } from '../../../shared/models/product';
import { LoadingState } from '../../../shared/models/loading-state';

import { ProductService } from '../../../core/services/product';

@Component({
  selector: 'app-product-list',
  imports: [
    AsyncPipe,
    TitleCasePipe,
    Breadcrumb,
    ProductCard,
    ProductCardSkeleton,
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  private readonly retry$ = new Subject<void>();
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);



  // Retry failed product requests
  retryProducts(): void {
    this.retry$.next();
  }

  // Read category from the URL
  readonly category$ = this.route.url.pipe(
    map((segments) => segments[0]?.path ?? '')
  );

  // Read optional subcategory
  readonly subcategory$ = this.route.paramMap.pipe(
    map((params) => params.get('subcategory'))
  );

  // Generate breadcrumbs
  readonly breadcrumbs$ = this.route.url.pipe(
    map((segments): BreadcrumbItem[] => {
      const category = segments[0]?.path ?? '';
      const subcategory = segments[1]?.path;

      const formatLabel = (value: string): string =>
        value
          .split('-')
          .map((word) =>
            word.charAt(0).toUpperCase() + word.slice(1)
          )
          .join(' ');

      const items: BreadcrumbItem[] = [
        { label: 'Home', url: '/' },
      ];

      if (category) {
        items.push({
          label: formatLabel(category),
          url: `/${category}`,
        });
      }

      if (subcategory) {
        items.push({
          label: formatLabel(subcategory),
        });
      }

      return items;
    })
  );

  // Product data and loading state
  readonly productState$: Observable<LoadingState<Product[]>> =
    combineLatest([
      this.route.url,
      this.retry$.pipe(startWith(undefined)),
    ]).pipe(
      switchMap(([segments]) => {
        const category = segments[0]?.path ?? '';
        const subcategory = segments[1]?.path;

        return defer(() =>
          subcategory
            ? this.productService.getProductsBySubcategory(
              category,
              subcategory
            )
            : this.productService.getProductsByCategory(category)
        ).pipe(
          map((products): LoadingState<Product[]> =>
            products.length > 0
              ? { status: 'success', data: products }
              : { status: 'empty' }
          ),

          catchError(() =>
            of<LoadingState<Product[]>>({
              status: 'error',
              message: 'Unable to load products. Please try again.',
            })
          ),

          startWith<LoadingState<Product[]>>({
            status: 'loading',
          })
        );
      })
    );
}
