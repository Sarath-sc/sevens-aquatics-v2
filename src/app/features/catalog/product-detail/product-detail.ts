
import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { ProductDetailSkeleton } from '../../../shared/components/product-detail-skeleton/product-detail-skeleton';

@Component({
  selector: 'app-product-detail',
  imports: [
    AsyncPipe,
    RouterLink,
    ProductDetailSkeleton,
  ],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail {
  private readonly route = inject(ActivatedRoute);

  // Controls the skeleton loading state
  readonly isLoading = signal(false);

  // Read the product slug from the URL
  readonly productSlug$ = this.route.paramMap.pipe(
    map((params) => params.get('slug') ?? '')
  );
}
