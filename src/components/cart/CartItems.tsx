
export type CartItem = {
    id: number;
    name: string;
    color: string;
    size: string;
    price: number;
    imageUrl: string;
  };
  
  export const cartItems: CartItem[] = [
    {
      id: 1,
      name: 'Red Shirt',
      color: 'Color Black',
      size: 'XXL',
      price: 1800,
      imageUrl: 'Group 6.png', 
    },
    {
      id: 2,
      name: 'White T.Shirt',
      color: 'Color Blue',
      size: 'XXL Background Text',
      price: 1900,
      imageUrl: 'white shirt.png', 
    },
  ];