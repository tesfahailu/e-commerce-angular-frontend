export interface Order {
  userId: string;
  datePlaced: number;
  items: Item[];
  shipping: Shipping;
}

interface Item {
  product: Product;
  quantity: number;
  totalPrice: number;
}

interface Product {
  imageUrl: string;
  price: number;
  title: string;
}

interface Shipping {
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
}
