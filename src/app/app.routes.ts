
import { Routes } from '@angular/router';

export const routes: Routes = [
  // Homepage
  {
    path: '',
    pathMatch: 'full',
    title: 'Home | SEVENS Aquatics & Pets',
    loadComponent: () =>
      import('./features/home/home').then((m) => m.Home),
  },

  // Fish catalogue
  {
    path: 'fish',
    loadComponent: () =>
      import('./features/catalog/product-list/product-list')
        .then((m) => m.ProductList),
  },
  {
    path: 'fish/:subcategory',
    loadComponent: () =>
      import('./features/catalog/product-list/product-list')
        .then((m) => m.ProductList),
  },

  // Plants catalogue
  {
    path: 'plants',
    loadComponent: () =>
      import('./features/catalog/product-list/product-list')
        .then((m) => m.ProductList),
  },
  {
    path: 'plants/:subcategory',
    loadComponent: () =>
      import('./features/catalog/product-list/product-list')
        .then((m) => m.ProductList),
  },

  // Mosses catalogue
  {
    path: 'mosses',
    loadComponent: () =>
      import('./features/catalog/product-list/product-list')
        .then((m) => m.ProductList),
  },
  {
    path: 'mosses/:subcategory',
    loadComponent: () =>
      import('./features/catalog/product-list/product-list')
        .then((m) => m.ProductList),
  },

  // Supplies catalogue
  {
    path: 'supplies',
    loadComponent: () =>
      import('./features/catalog/product-list/product-list')
        .then((m) => m.ProductList),
  },
  {
    path: 'supplies/:subcategory',
    loadComponent: () =>
      import('./features/catalog/product-list/product-list')
        .then((m) => m.ProductList),
  },

  {
    path: 'products/:slug',
    loadComponent: () =>
      import('./features/catalog/product-detail/product-detail')
        .then((m) => m.ProductDetail),
  },

  // Unknown routes
  {
    path: '**',
    redirectTo: '',
  },
];
