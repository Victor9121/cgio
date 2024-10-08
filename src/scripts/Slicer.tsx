
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  link: string;
  id: string;
  brand: string;
  name: string;
  item: string;
  price: number;
  oldprice: number;
  count: number;
  available: number;
  product_desc: string;
}

interface State {
  selected_id: number;
  username: string;
  products: any[];
  token: string | null;
  history: any[];
  cart: Product[];
  product: Product | null;
  Laptops: any[];
  ids: any[];
  Laptop: Product | null;
  count: number;
  orders: any[];
  searchTerm: string;
  totalamount: number;
}


const initialState: State = {
  selected_id: 0,
  username: sessionStorage.getItem('username') || '',
  products: [],
  token: sessionStorage.getItem('token') || null,
  history: [],
  cart: JSON.parse(sessionStorage.getItem('cart') || '[]'),
  product: null,
  Laptops: [],
  ids: [
    { id: '100', amount: 2000, price: 2000, count: 1 },
    { id: '200', amount: 1209, price: 1209, count: 1 },
    { id: '134', amount: 2499, price: 2499, count: 1 },
    { id: '955', amount: 1600, price: 1600, count: 1 },
    { id: '345', amount: 799, price: 799, count: 1 },
    { id: '111', amount: 40000, price: 40000, count: 1 },
    { id: '222', amount: 32909, price: 32909, count: 1 },
    { id: '333', amount: 64999, price: 64999, count: 1 },
    { id: '455', amount: 128000, price: 128000, count: 1 },
    { id: '555', amount: 14000, price: 14000, count: 1 },
  ],
  Laptop: null,
  count: parseInt(sessionStorage.getItem('count') || '0'),
  orders: JSON.parse(sessionStorage.getItem('orders') || '[]'),
  searchTerm: '',
  totalamount: parseFloat(sessionStorage.getItem('totalamount') || '0'),
};


const Slicers = createSlice({
  name: 'Ajio',
  initialState,
  reducers: {
    setproducts(state, action: PayloadAction<any[]>) {
      state.products = action.payload;
    },
    setid(state, action: PayloadAction<number>) {
      state.selected_id = action.payload;
    },
    addToCart(state, action: PayloadAction<Product>) { 
      const product = action.payload;
      state.cart.push(product);
      state.count = state.cart.length;
      state.totalamount += product.price;
      sessionStorage.setItem('cart', JSON.stringify(state.cart));
      sessionStorage.setItem('count', state.count.toString());
      sessionStorage.setItem('totalamount', state.totalamount.toString());
    },
    addItem(state, action: PayloadAction<string>) {
      const id = action.payload;
      const item = state.cart.find(item => item.id === id);
      if (item) {
        const wanted = state.ids.find(item => item.id === id);
        if (wanted) {
          wanted.count += 1;
          wanted.price = wanted.count * wanted.price;
        }
        state.totalamount += item.price;
        sessionStorage.setItem('totalamount', state.totalamount.toString());
      }
    },
    removeFromCart(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      const itemIndex = state.cart.findIndex(item => item.id === id);
      if (itemIndex >= 0) {
        state.cart.splice(itemIndex, 1);
        state.count -= 1;

        const wanted = state.ids.find(item => item.id === id);
        if (wanted) {
          state.totalamount -= wanted.price || 0;
          wanted.price = wanted.oldprice;
          wanted.count = 1;
        }

        sessionStorage.setItem('cart', JSON.stringify(state.cart));
        sessionStorage.setItem('count', state.count.toString());
        sessionStorage.setItem('totalamount', state.totalamount.toString());
      }
    },
    placeorder(state) {
      state.count = 0;
      state.orders = [...state.orders, ...state.cart];
      state.cart = [];
      state.totalamount = 0;
      sessionStorage.setItem('cart', JSON.stringify(state.cart));
      sessionStorage.setItem('orders', JSON.stringify(state.orders));
      sessionStorage.setItem('count', state.count.toString());
      sessionStorage.setItem('totalamount', state.totalamount.toString());
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setProduct(state, action: PayloadAction<Product | null>) {
      state.product = action.payload;
    },
    setLaptops(state, action: PayloadAction<any[]>) {
      state.Laptops = action.payload;
    },
    setLaptop(state, action: PayloadAction<Product | null>) {
      state.Laptop = action.payload;
    },
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
      sessionStorage.setItem('username', state.username);
    },
    setToken(state) {
      state.token = "hello";
      sessionStorage.setItem('token', state.token);
    },
    deleteToken(state) {
      sessionStorage.clear();
      state.orders = [];
    },
    removingitem(state, action: PayloadAction<string>) {
      const id = action.payload;
      const item = state.cart.find(item => item.id === id);
      if (item) {
        const wanted = state.ids.find(item => item.id === id);
        if (wanted) {
          if (wanted.count > 1) {
            wanted.count -= 1;
            wanted.price -= item.price;
          } else {
            const itemIndex = state.cart.findIndex(item => item.id === id);
            if (itemIndex >= 0) {
              state.cart.splice(itemIndex, 1);
              state.count -= 1;
            }
            wanted.price = wanted.oldprice;
            wanted.count = 1;
          }
          state.totalamount -= item.price;
          sessionStorage.setItem('totalamount', state.totalamount.toString());
        }
      }
    }
  }
});

export const { 
  setproducts, setid, deleteToken, setToken, addToCart, addItem, removeFromCart, 
  placeorder, setSearchTerm, setProduct, setLaptops, 
  setLaptop, setUsername, removingitem 
} = Slicers.actions;

export default Slicers.reducer;
