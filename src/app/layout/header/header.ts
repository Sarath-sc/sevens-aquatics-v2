
import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly isMenuOpen = signal(false);
  readonly isSearchOpen = signal(false);
  readonly expandedCategory = signal<string | null>(null);


  readonly navigationItems = [
    {
      label: 'Home',
      route: '/',
      children: []
    },
    {
      label: 'Fish',
      route: '/fish',
      children: [
        { label: 'All Fish', route: '/fish' },
        { label: 'Guppies', route: '/fish/guppies' },
        { label: 'Bettas', route: '/fish/bettas' },
        { label: 'Mollies', route: '/fish/mollies' },
        { label: 'Platies', route: '/fish/platies' }
      ]
    },
    {
      label: 'Plants',
      route: '/plants',
      children: [
        { label: 'All Plants', route: '/plants' },
        { label: 'Aquarium Plants', route: '/plants/aquarium-plants' },
        { label: 'Terrestrial Plants', route: '/plants/terrestrial-plants' },
        { label: 'Floating Plants', route: '/plants/floating-plants' }
      ]
    },
    {
      label: 'Mosses',
      route: '/mosses',
      children: [
        { label: 'All Mosses', route: '/mosses' },
        { label: 'Java Moss', route: '/mosses/java-moss' },
        { label: 'Christmas Moss', route: '/mosses/christmas-moss' },
        { label: 'Peacock Moss', route: '/mosses/peacock-moss' },
        { label: 'Riccia', route: '/mosses/riccia' }
      ]
    },
    {
      label: 'Supplies',
      route: '/supplies',
      children: [
        { label: 'All Supplies', route: '/supplies' },
        { label: 'Fish Food', route: '/supplies/fish-food' },
        { label: 'Accessories', route: '/supplies/accessories' },
        { label: 'Filters & Air Pumps', route: '/supplies/filters-air-pumps' },
        { label: 'Aquarium Care', route: '/supplies/aquarium-care' }
      ]
    },
    {
      label: 'Offers',
      route: '/offers',
      children: []
    },
    {
      label: 'Contact',
      route: '/contact',
      children: []
    }
  ];


  toggleCategory(categoryRoute: string): void {
    this.expandedCategory.update((currentCategory) =>
      currentCategory === categoryRoute ? null : categoryRoute
    );
  }

  toggleMenu(): void {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
    this.expandedCategory.set(null);
  }

  toggleSearch(): void {
    this.isSearchOpen.update(isOpen => !isOpen);
  }
}
