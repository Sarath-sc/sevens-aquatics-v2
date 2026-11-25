
import { Component, input } from '@angular/core';

export type SkeletonShape = 'text' | 'rectangle' | 'circle';

@Component({
  selector: 'app-skeleton-loader',
  imports: [],
  templateUrl: './skeleton-loader.html',
  styleUrl: './skeleton-loader.scss',
})
export class SkeletonLoader {
  // Skeleton dimensions
  readonly width = input<string>('100%');
  readonly height = input<string>('16px');

  // Skeleton appearance
  readonly shape = input<SkeletonShape>('rectangle');
  readonly borderRadius = input<string>('8px');

  // Enable or disable shimmer animation
  readonly animated = input<boolean>(true);
}
