export interface Item {
  title: string;
  content: string;
  price: string;
  src: string;
  rating: number;
  location: string;
  vote: string;
}

export interface State {
  cart: Array<Item>;
  history: [
    {
      items: any;
      timestamp: string;
    }
  ];
}

export const baseState: State = {
  cart: [],
  history: [
    {
      items: {},
      timestamp: "",
    },
  ],
};

export default { ...baseState };
