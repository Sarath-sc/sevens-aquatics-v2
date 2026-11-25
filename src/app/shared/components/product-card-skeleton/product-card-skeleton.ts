
import { Component } from '@angular/core';
import { SkeletonLoader } from '../skeleton-loader/skeleton-loader';

@Component({
  selector: 'app-product-card-skeleton',
  imports: [SkeletonLoader],
  templateUrl: './product-card-skeleton.html',
  styleUrl: './product-card-skeleton.scss',
})
export class ProductCardSkeleton {}
