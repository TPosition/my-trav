export interface Item {
  title: string;
  content: string;
  price: string;
  src: string;
}

export interface State {
  cart: Array<Item>;
}

export const baseState: State = {
  cart: [],
};

export default { ...baseState };
