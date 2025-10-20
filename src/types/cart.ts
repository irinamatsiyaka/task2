export type CartItem = {
   id: number;
   name: string;
   price: number;
   quantity: number;
};

export type CartProps = {
   cartItems: CartItem[];
   setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
   setCartCount: React.Dispatch<React.SetStateAction<number>>;
};
