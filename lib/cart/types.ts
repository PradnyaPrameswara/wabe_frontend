export type CartItem = {
  slug: string;
  name: string;
  image: string;
  quantity: number;
  option?: string;
  details?: Array<{ label: string; value: string }>;
};

export type AddCartItemInput = Omit<CartItem, "quantity"> & {
  quantity?: number;
};
