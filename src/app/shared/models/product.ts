
// SEVENS Aquatics - Shared Product Model

export interface Product {
    id: string;
    name: string;
    slug: string;
    category: string;
    subcategory: string | null;

    // Product information
    description?: string;
    careInformation?: string;

    // Pricing and inventory
    price: number;
    stockQuantity: number;

    // Product images
    imageUrl: string | null;
    galleryImages?: string[];

    // Publication status
    isPublished: boolean;

    // SEO
    seoTitle?: string;
    seoDescription?: string;

    // Record management
    createdAt?: string;
    updatedAt?: string;
}
