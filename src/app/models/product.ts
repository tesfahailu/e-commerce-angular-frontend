export interface Product {
  title?: string;
  price?: number;
  category?: string;
  imageUrl?: string;
}

export interface ProductData {
  key: string;
  data: Product;
}
