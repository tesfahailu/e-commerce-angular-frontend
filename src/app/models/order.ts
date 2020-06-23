import { ShoppingCart } from './shopping-cart';
export class Order {
  datePlaced: number;
  items: Item[];

  constructor(
    public userId: string,
    public shipping: Shipping,
    public shoppingCart: ShoppingCart,
  ) {
    this.datePlaced = new Date().getTime();

    this.items = shoppingCart.items.map((item) => {
      return {
        product: {
          title: item.title,
          imageUrl: item.imageUrl,
          price: item.price,
        },
        quantity: item.quantity,
        totalPrice: item.totalPrice,
      };
    });
  }
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
