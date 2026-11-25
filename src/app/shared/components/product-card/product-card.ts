
import { Component, input, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  readonly product = input.required<Product>();

  readonly isInStock = computed(
    () => this.product().stockQuantity > 0
  );

  readonly productUrl = computed(
    () => `/products/${this.product().slug}`
  );
}
