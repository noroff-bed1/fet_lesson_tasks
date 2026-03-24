import { create } from 'zustand';
import axios from 'axios';
 
const API_URL = 'https://bedos-jip-ca-servers.onrender.com/products';
 
const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,
 
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(API_URL);
      set({ products: response.data });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },
}));
 
export default useProductStore;