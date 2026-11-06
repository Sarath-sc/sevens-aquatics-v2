
import {
  Component,
  DestroyRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';

const SLIDE_INTERVAL_MS = 5000;

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  readonly heroSlides = [
    {
      image: '/images/hero/aquarium-1.webp',
      alt: 'Neon tetra fish swimming in a planted aquarium',
    },
    {
      image: '/images/hero/aquarium-2.webp',
      alt: 'Freshwater fish swimming among aquatic plants',
    },
    {
      image: '/images/hero/aquarium-3.webp',
      alt: 'Lush moss aquascape with rocks and aquatic plants',
    },
  ];

  readonly currentSlide = signal(0);
  readonly totalSlides = this.heroSlides.length;

  private readonly destroyRef = inject(DestroyRef);

  private slideInterval: ReturnType<typeof setInterval> | null = null;

  constructor() {
    afterNextRender(() => {
      this.startAutoSlide();
    });

    this.destroyRef.onDestroy(() => {
      this.stopAutoSlide();
    });
  }

  startAutoSlide(): void {
    if (this.slideInterval !== null) {
      return;
    }

    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, SLIDE_INTERVAL_MS);
  }

  stopAutoSlide(): void {
    if (this.slideInterval !== null) {
      clearInterval(this.slideInterval);
      this.slideInterval = null;
    }
  }

  nextSlide(): void {
    this.currentSlide.update(
      (slide) => (slide + 1) % this.totalSlides
    );
  }

  previousSlide(): void {
    this.currentSlide.update(
      (slide) =>
        (slide - 1 + this.totalSlides) % this.totalSlides
    );
  }


  goToSlide(index: number): void {
    if (index >= 0 && index < this.totalSlides) {
      this.currentSlide.set(index);
    }
  }


  private touchStartX: number | null = null;

  onPointerDown(event: PointerEvent): void {
    if (event.pointerType !== 'touch') {
      return;
    }

    this.touchStartX = event.clientX;
  }

  onPointerUp(event: PointerEvent): void {
    if (event.pointerType !== 'touch' || this.touchStartX === null) {
      return;
    }

    const swipeDistance = event.clientX - this.touchStartX;
    const MIN_SWIPE_DISTANCE = 50;

    if (Math.abs(swipeDistance) >= MIN_SWIPE_DISTANCE) {
      if (swipeDistance < 0) {
        this.nextSlide();
      } else {
        this.previousSlide();
      }
    }

    this.touchStartX = null;
  }

  onPointerCancel(): void {
    this.touchStartX = null;
  }


  onHeroPointerEnter(event: PointerEvent): void {
    if (event.pointerType === 'mouse') {
      this.stopAutoSlide();
    }
  }

  onHeroPointerLeave(event: PointerEvent): void {
    if (event.pointerType === 'mouse') {
      this.startAutoSlide();
    }
  }


}
