
import { Component } from '@angular/core';
import { SkeletonLoader } from '../skeleton-loader/skeleton-loader';

@Component({
  selector: 'app-product-detail-skeleton',
  imports: [SkeletonLoader],
  templateUrl: './product-detail-skeleton.html',
  styleUrl: './product-detail-skeleton.scss',
})
export class ProductDetailSkeleton {}
